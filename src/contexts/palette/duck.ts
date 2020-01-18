import * as tb from 'ts-toolbelt';

import { Action } from '../../../typings/Action';
import { Resolvable } from '../../../typings/Component';

enum ActionType {
  Close = 'CLOSE',
  EndPending = 'END_PENDING',
  Open = 'OPEN',
  Next = 'NEXT',
  StartPending = 'START_PENDING',
}

type CloseAction = Action<ActionType.Close>;
type EndPendingAction = Action<ActionType.EndPending>;
type OpenAction = Action<ActionType.Open>;
type NextAction = Action<ActionType.Next, unknown>;
type StartPendingAction = Action<ActionType.StartPending>;

export type Actions =
  | CloseAction
  | EndPendingAction
  | OpenAction
  | NextAction
  | StartPendingAction;

export interface State {
  currentIndex: number;
  isOpen: boolean;
  isPending: boolean;
  pipe: tb.L.List<Resolvable>;
  value: unknown;
}

export const init = (pipe: tb.L.List<Resolvable>): State => ({
  currentIndex: 0,
  isOpen: false,
  isPending: false,
  pipe,
  value: null,
});

export const close = (): CloseAction => ({
  type: ActionType.Close,
});

export const endPending = (): EndPendingAction => ({
  type: ActionType.EndPending,
});

export const open = (): OpenAction => ({
  type: ActionType.Open,
});

export const next = (value: unknown): NextAction => ({
  type: ActionType.Next,
  payload: value,
});

export const startPending = (): StartPendingAction => ({
  type: ActionType.StartPending,
});

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionType.Close: {
      return init(state.pipe);
    }

    case ActionType.EndPending: {
      return !state.isOpen
        ? state
        : {
            ...state,
            isPending: false,
          };
    }

    case ActionType.Open: {
      return state.isOpen
        ? state
        : {
            ...state,
            isOpen: true,
          };
    }

    case ActionType.Next: {
      return !state.isOpen
        ? state
        : {
            ...state,
            currentIndex: state.currentIndex + 1,
            value: action.payload,
          };
    }

    case ActionType.StartPending: {
      return !state.isOpen
        ? state
        : {
            ...state,
            isPending: true,
          };
    }

    default: {
      throw new Error('action not found');
    }
  }
};
