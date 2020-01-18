import { Item } from '../../typings/Item';

import { Action } from './types';

enum ActionType {
  End = 'END',
  Start = 'START',
}

type EndAction = Action<ActionType.End, Item>;
type StartAction = Action<ActionType.Start, Item>;

type Actions = EndAction | StartAction;

interface State {
  progress: boolean;
  summary: string | undefined;
}

export const initialState: State = {
  progress: false,
  summary: undefined,
};

export const end = (item: Item): EndAction => ({
  type: ActionType.End,
  payload: item,
});

export const start = (item: Item): StartAction => ({
  type: ActionType.Start,
  payload: item,
});

export default function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.End: {
      return {
        ...state,
        progress: false,
        summary: undefined,
      };
    }

    case ActionType.Start: {
      return {
        ...state,
        progress: true,
        summary: action.payload.label,
      };
    }

    default: {
      throw new Error('action not found');
    }
  }
}
