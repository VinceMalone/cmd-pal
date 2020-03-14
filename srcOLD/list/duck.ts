import { Action } from '../ducks/types';
import { Item, ListItem } from '../types';
import { searchItems } from '../util/searchItems';

/**
 * TODO:
 * - sort commands in some useful way
 * - add `lastUsed` metadata
 * - add `matchedCharacter` metadata
 * - add "categories" or "labels"
 */

enum ActionType {
  MoveFocus = 'MOVE_FOCUS',
  Reset = 'RESET',
  Search = 'SEARCH',
  SetItems = 'SET_ITEMS',
}

type MoveFocusAction = Action<ActionType.MoveFocus, number>;
type ResetAction = Action<ActionType.Reset>;
type SearchAction = Action<ActionType.Search, string>;
type SetItemsAction = Action<ActionType.SetItems, Item[]>;

export type Actions =
  | MoveFocusAction
  | ResetAction
  | SearchAction
  | SetItemsAction;

export interface State {
  activeDescendant: string | undefined;
  allItems: ListItem[];
  focusedIndex: number;
  items: ListItem[];
  searchQuery: string;
}

export const initialState: State = {
  activeDescendant: undefined,
  allItems: [],
  focusedIndex: 0,
  items: [],
  searchQuery: '',
};

export const moveFocus = (delta: number): MoveFocusAction => ({
  type: ActionType.MoveFocus,
  payload: delta,
});

export const reset = (): ResetAction => ({
  type: ActionType.Reset,
});

export const search = (query: string): SearchAction => ({
  type: ActionType.Search,
  payload: query,
});

export const setItems = (items: Item[]): SetItemsAction => ({
  type: ActionType.SetItems,
  payload: items,
});

const getActiveDescendant = (items: ListItem[], focusedIndex: number) =>
  items[focusedIndex] == null ? undefined : items[focusedIndex].id;

const toSearchableItem = (item: Item): ListItem => ({
  ...item,
  id: `cmd-item__${item.id}`,
  matches: [],
});

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionType.MoveFocus: {
      const size = state.items.length;
      const next = state.focusedIndex + action.payload;
      const focusedIndex = next < 0 ? size - 1 : next % size;
      const activeDescendant = getActiveDescendant(state.items, focusedIndex);

      return {
        ...state,
        activeDescendant,
        focusedIndex,
      };
    }

    case ActionType.Reset: {
      const items = state.allItems;
      const focusedIndex = 0;

      return {
        ...state,
        activeDescendant: getActiveDescendant(items, focusedIndex),
        focusedIndex,
        items,
        searchQuery: '',
      };
    }

    case ActionType.Search: {
      const searchQuery = action.payload;
      const items = searchItems(state.allItems, searchQuery);
      const focusedIndex = 0;

      return {
        ...state,
        activeDescendant: getActiveDescendant(items, focusedIndex),
        items,
        focusedIndex,
        searchQuery,
      };
    }

    case ActionType.SetItems: {
      const allItems = action.payload.map(toSearchableItem);
      const items = searchItems(allItems, state.searchQuery);
      const focusedIndex = 0;

      return {
        ...state,
        activeDescendant: getActiveDescendant(items, focusedIndex),
        allItems,
        items,
        focusedIndex,
      };
    }

    default: {
      throw new Error('action not found');
    }
  }
};
