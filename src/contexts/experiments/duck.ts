import { Action } from '../../types/Action';
import { Experiments } from '../../types/Experiments';

enum ActionType {
  Set = 'SET',
}

type SetAction = Action<ActionType.Set, unknown>;

export type Actions = SetAction;

export interface State {
  experiments: Experiments;
}

export const init = (experiments: Experiments): State => {
  return {
    experiments,
  };
};

export const set = (value: unknown): SetAction => ({
  type: ActionType.Set,
  payload: value,
});

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionType.Set: {
      return {
        ...state,
      };
    }

    default: {
      throw new Error('action not found');
    }
  }
};
