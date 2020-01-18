import { Command, CommandItem } from '../typings/Item';

import { searchItems } from './util/searchItems';

/**
 * TODO:
 * - sort commands in some useful way
 * - add `lastUsed` metadata
 * - add `matchedCharacter` metadata
 * - add "categories" or "labels"
 */

type Action<T, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P };

enum ActionType {
  Close = 'CLOSE',
  ExecEnd = 'EXEC_END',
  ExecPipe = 'EXEC_PIPE',
  ExecStart = 'EXEC_START',
  Open = 'OPEN',
  MoveFocus = 'MOVE_FOCUS',
  Search = 'SEARCH',
  SetCommands = 'SET_COMMANDS',
}

type CloseAction = Action<ActionType.Close>;
type ExecEndAction = Action<ActionType.ExecEnd, CommandItem>;
type ExecPipeAction = Action<ActionType.ExecPipe, any[]>; // TODO
type ExecStartAction = Action<ActionType.ExecStart, CommandItem>;
type OpenAction = Action<ActionType.Open>;
type MoveFocusAction = Action<ActionType.MoveFocus, number>;
type SearchAction = Action<ActionType.Search, string>;
type SetCommandsAction = Action<ActionType.SetCommands, Command[]>;

type Actions =
  | CloseAction
  | ExecEndAction
  | ExecPipeAction
  | ExecStartAction
  | OpenAction
  | MoveFocusAction
  | SearchAction
  | SetCommandsAction;

interface State {
  activeDescendant: string | undefined;
  allCommands: CommandItem[];
  commands: CommandItem[];
  focusedIndex: number;
  opened: boolean;
  progress: boolean;
  query: string;
  summary: string | undefined;

  pipe: any[];
}

export const initialState: State = {
  activeDescendant: undefined,
  allCommands: [],
  commands: [],
  focusedIndex: 0,
  opened: false,
  progress: false,
  query: '',
  summary: undefined,

  pipe: [],
};

export const close = (): CloseAction => ({ type: ActionType.Close });
export const execEnd = (cmd: CommandItem): ExecEndAction => ({
  type: ActionType.ExecEnd,
  payload: cmd,
});
// TODO: type
export const execPipe = (pipe: any[]): ExecPipeAction => ({
  type: ActionType.ExecPipe,
  payload: pipe,
});
export const execStart = (cmd: CommandItem): ExecStartAction => ({
  type: ActionType.ExecStart,
  payload: cmd,
});
export const open = (): OpenAction => ({ type: ActionType.Open });
export const moveFocus = (delta: number): MoveFocusAction => ({
  type: ActionType.MoveFocus,
  payload: delta,
});
export const search = (query: string): SearchAction => ({
  type: ActionType.Search,
  payload: query,
});
export const setCommands = (commands: Command[]): SetCommandsAction => ({
  type: ActionType.SetCommands,
  payload: commands,
});

const getActiveDescendant = (commands: CommandItem[], focusedIndex: number) =>
  commands[focusedIndex] == null ? undefined : commands[focusedIndex].id;

export default function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.ExecEnd: {
      return {
        ...state,
        progress: false,
        summary: undefined,
      };
    }
    case ActionType.ExecPipe: {
      return {
        ...state,
        pipe: action.payload,
      };
    }
    case ActionType.ExecStart: {
      return {
        ...state,
        progress: true,
        summary: action.payload.label,
      };
    }
    case ActionType.MoveFocus: {
      const size = state.commands.length;
      const next = state.focusedIndex + action.payload;
      const focusedIndex = next < 0 ? size - 1 : next % size;
      const activeDescendant = getActiveDescendant(
        state.commands,
        focusedIndex,
      );
      return {
        ...state,
        activeDescendant,
        focusedIndex,
      };
    }
    case ActionType.Close: {
      const commands = state.allCommands;
      const focusedIndex = 0;
      return {
        ...state,
        activeDescendant: getActiveDescendant(commands, focusedIndex),
        commands,
        focusedIndex,
        opened: false,
        query: '',
      };
    }
    case ActionType.Open: {
      return {
        ...state,
        opened: true,
      };
    }
    case ActionType.Search: {
      const query = action.payload;
      const commands = searchItems(state.allCommands, query);
      const focusedIndex = 0;
      return {
        ...state,
        activeDescendant: getActiveDescendant(commands, focusedIndex),
        commands,
        focusedIndex,
        query,
      };
    }
    case ActionType.SetCommands: {
      const allCommands = action.payload.map(cmd => ({
        ...cmd,
        id: `cmd-item__${cmd.id}`,
        matches: [],
      }));
      const commands = searchItems(allCommands, state.query);
      const focusedIndex = 0;
      return {
        ...state,
        activeDescendant: getActiveDescendant(commands, focusedIndex),
        allCommands,
        commands,
        focusedIndex,
      };
    }
    default:
      throw new Error('action not found');
  }
}