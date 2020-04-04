import { Action } from '../../types/Action';
import { Token } from '../../types/Token';
import { circularClamp } from '../../utils/circularClamp';

enum ActionType {
  Add = 'ADD',
  Clear = 'CLEAR',
  MoveFocus = 'MOVE_FOCUS',
  Remove = 'REMOVE',
  Toggle = 'TOGGLE',
  Unfocus = 'UNFOCUS',
}

type DeltaOrIndex = { delta: number } | { index: number };

type AddAction = Action<ActionType.Add, Token>;
type ClearAction = Action<ActionType.Clear>;
type MoveFocusAction = Action<ActionType.MoveFocus, DeltaOrIndex>;
type RemoveAction = Action<ActionType.Remove, DeltaOrIndex>;
type ToggleAction = Action<ActionType.Toggle, Token>;
type UnfocusAction = Action<ActionType.Unfocus>;

export type Actions =
  | AddAction
  | ClearAction
  | MoveFocusAction
  | RemoveAction
  | ToggleAction
  | UnfocusAction;

const removeAt = <T>(arr: readonly T[], index: number): T[] => {
  const result = [...arr];
  result.splice(index, 1);
  return result;
};

const wrapIndex = (index: number, length: number) =>
  circularClamp(index, -1, length);

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

export const clear = (): ClearAction => ({
  type: ActionType.Clear,
});

export const moveFocus = (payload: DeltaOrIndex): MoveFocusAction => ({
  type: ActionType.MoveFocus,
  payload,
});

export const remove = (payload: DeltaOrIndex): RemoveAction => ({
  type: ActionType.Remove,
  payload,
});

export const toggle = (token: Token): ToggleAction => ({
  type: ActionType.Toggle,
  payload: token,
});

export const unfocus = (): UnfocusAction => ({
  type: ActionType.Unfocus,
});

const removeAtIndex = (state: State, index: number): State => ({
  ...state,
  focusedIndex: -1,
  tokens: removeAt(state.tokens, index),
});

const removeAtOffset = (state: State, delta: number): State => {
  const removalIndex = wrapIndex(
    state.focusedIndex + delta,
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
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionType.Add: {
      return {
        ...state,
        tokens: [...state.tokens, action.payload],
      };
    }

    case ActionType.Clear: {
      return init([]);
    }

    case ActionType.MoveFocus: {
      const index =
        'delta' in action.payload
          ? action.payload.delta + state.focusedIndex
          : action.payload.index;

      return {
        ...state,
        focusedIndex: wrapIndex(index, state.tokens.length),
      };
    }

    case ActionType.Remove: {
      return 'index' in action.payload
        ? removeAtIndex(state, action.payload.index)
        : removeAtOffset(state, action.payload.delta);
    }

    case ActionType.Toggle: {
      const { id } = action.payload;
      const index = state.tokens.findIndex(token => token.id === id);

      return index === -1
        ? reducer(state, add(action.payload))
        : reducer(state, remove({ index }));
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
