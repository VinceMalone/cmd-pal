import { Action } from '../../types/Action';
import { Item, ListItem } from '../../types/List';
import { circularClamp } from '../../utils/circularClamp';
import { createDomId } from '../../utils/domId';
import { searchItems } from '../../utils/searchItems';

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

const getActiveDescendant = (items: ListItem[], focusedIndex: number) =>
  items[focusedIndex] == null ? undefined : items[focusedIndex].id;

const toSearchableItem = (item: Item): ListItem => ({
  ...item,
  id: createDomId('list-item'),
  matches: [],
});

const wrapIndex = (index: number, length: number) =>
  circularClamp(index, 0, length);

export interface State<T extends ListItem = ListItem> {
  activeDescendant: string | undefined;
  allItems: T[];
  focusedIndex: number;
  items: T[];
  searchQuery: string;
}

export const init = (payload: {
  items: readonly Item[];
  searchQuery: string;
}): State => {
  // TODO: is `setItems` needed now?
  const allItems = payload.items.map(toSearchableItem);
  const items = searchItems(allItems, payload.searchQuery);
  const focusedIndex = 0;

  return {
    activeDescendant: getActiveDescendant(items, focusedIndex),
    allItems,
    focusedIndex,
    items,
    searchQuery: payload.searchQuery,
  };
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

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionType.MoveFocus: {
      const focusedIndex = wrapIndex(
        state.focusedIndex + action.payload,
        state.items.length,
      );
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
      // Don't reset the focused index if the search query didn't change the results
      const focusedIndex = items !== state.items ? 0 : state.focusedIndex;

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
