import { Action } from '../../types/Action';
import { Token } from '../../types/Token';

enum ActionType {
  Add = 'ADD',
  MoveFocus = 'MOVE_FOCUS',
  RemoveAtIndex = 'REMOVE_AT_INDEX',
  RemoveAtOffset = 'REMOVE_AT_OFFSET',
  Toggle = 'TOGGLE',
  Unfocus = 'UNFOCUS',
}

type AddAction = Action<ActionType.Add, Token>;
type MoveFocusAction = Action<ActionType.MoveFocus, number>;
type RemoveAtIndexAction = Action<ActionType.RemoveAtIndex, number>;
type RemoveAtOffsetAction = Action<ActionType.RemoveAtOffset, number>;
type ToggleAction = Action<ActionType.Toggle, Token>;
type UnfocusAction = Action<ActionType.Unfocus>;

export type Actions =
  | AddAction
  | MoveFocusAction
  | RemoveAtIndexAction
  | RemoveAtOffsetAction
  | ToggleAction
  | UnfocusAction;

export interface State {
  focusedIndex: number;
  tokens: readonly Token[];
}

export const init = (tokens: readonly Token[]): State => {
  return {
    focusedIndex: -1,
    tokens,
  };
};

export const add = (token: Token): AddAction => ({
  type: ActionType.Add,
  payload: token,
});

export const moveFocus = (delta: number): MoveFocusAction => ({
  type: ActionType.MoveFocus,
  payload: delta,
});

export const removeAtIndex = (index: number): RemoveAtIndexAction => ({
  type: ActionType.RemoveAtIndex,
  payload: index,
});

export const removeAtOffset = (delta: number): RemoveAtOffsetAction => ({
  type: ActionType.RemoveAtOffset,
  payload: delta,
});

export const toggle = (token: Token): ToggleAction => ({
  type: ActionType.Toggle,
  payload: token,
});

export const unfocus = (): UnfocusAction => ({
  type: ActionType.Unfocus,
});

const removeAt = <T>(arr: readonly T[], index: number): T[] => {
  const result = [...arr];
  result.splice(index, 1);
  return result;
};

// const cyclicalClamp = (n: number, min: number, max: number): number =>
//   n < min ? max : n > max || max === -1 ? min : n % (max + 1);

const circularClamp = (n: number, min: number, max: number): number => {
  const offset = min >= 0 ? 0 : Math.abs(min);
  return offset === 0
    ? n >= min
      ? n % max
      : ((n % max) + max) % max
    : circularClamp(n + offset, min + offset, max + offset) - offset;
};

const wrapIndex = (index: number, length: number) =>
  circularClamp(index, -1, length);

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionType.Add: {
      return {
        ...state,
        tokens: [...state.tokens, action.payload],
      };
    }

    case ActionType.MoveFocus: {
      return {
        ...state,
        focusedIndex: wrapIndex(
          state.focusedIndex + action.payload,
          state.tokens.length,
        ),
      };
    }

    case ActionType.RemoveAtIndex: {
      return {
        ...state,
        focusedIndex: -1,
        tokens: removeAt(state.tokens, action.payload),
      };
    }

    case ActionType.RemoveAtOffset: {
      const removalIndex = wrapIndex(
        state.focusedIndex + action.payload,
        state.tokens.length,
      );

      const tokens = removeAt(state.tokens, removalIndex);

      // Move focus to `removalIndex` and ensure it isn't out of bounds
      const focusedIndex = wrapIndex(removalIndex, tokens.length);

      return {
        ...state,
        focusedIndex,
        tokens,
      };
    }

    case ActionType.Toggle: {
      const { id } = action.payload;
      const index = state.tokens.findIndex(token => token.id === id);

      return index === -1
        ? reducer(state, add(action.payload))
        : reducer(state, removeAtIndex(index));
    }

    case ActionType.Unfocus: {
      return {
        ...state,
        focusedIndex: -1,
      };
    }

    default: {
      throw new Error('action not found');
    }
  }
};
