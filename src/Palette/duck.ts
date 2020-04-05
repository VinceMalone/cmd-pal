import * as tb from 'ts-toolbelt';

import { Action } from '../types/Action';
import { ResolvableComponent } from '../types/ResolvableComponent';

type Pipe = tb.L.List<ResolvableComponent>;

enum ActionType {
  Close = 'CLOSE',
  Commit = 'COMMIT',
  Open = 'OPEN',
  Resolve = 'RESOLVE',
}

type CloseAction = Action<ActionType.Close>;
type CommitAction = Action<ActionType.Commit, unknown>;
type OpenAction = Action<ActionType.Open>;
type ResolveAction = Action<ActionType.Resolve, string>;

export type Actions = CloseAction | CommitAction | OpenAction | ResolveAction;

export interface State {
  currentIndex: number;
  isOpen: boolean;
  isPending: boolean;
  pendingSummary: string;
  pipe: Pipe;
  value: unknown;
}

export const init = (pipe: Pipe): State => ({
  currentIndex: 0,
  isOpen: true,
  isPending: false,
  pendingSummary: '',
  pipe,
  value: null,
});

export const close = (): CloseAction => ({
  type: ActionType.Close,
});

export const commit = (value: unknown): CommitAction => ({
  type: ActionType.Commit,
  payload: value,
});

export const open = (): OpenAction => ({
  type: ActionType.Open,
});

export const resolve = (summary: string): ResolveAction => ({
  type: ActionType.Resolve,
  payload: summary,
});

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionType.Close: {
      return init(state.pipe);
    }

    case ActionType.Commit: {
      return !state.isOpen
        ? state
        : {
            ...state,
            currentIndex: state.currentIndex + 1,
            isPending: false,
            pendingSummary: '',
            value: action.payload,
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

    case ActionType.Resolve: {
      return !state.isOpen
        ? state
        : {
            ...state,
            isPending: true,
            pendingSummary: action.payload,
          };
    }

    default: {
      throw new Error('action not found');
    }
  }
};
