import { Action } from '../../types/Action';
import { Item, ListItem } from '../../types/List';
import { circularClamp } from '../../utils/circularClamp';
import { createDomId } from '../../utils/domId';

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

type DeltaOrIndex = { delta: number } | { index: number };

type MoveFocusAction = Action<ActionType.MoveFocus, DeltaOrIndex>;
type ResetAction = Action<ActionType.Reset>;
type SearchAction = Action<ActionType.Search, string>;
type SetItemsAction = Action<ActionType.SetItems, Item[]>;

export type Actions =
  | MoveFocusAction
  | ResetAction
  | SearchAction
  | SetItemsAction;

const getActiveDescendant = (
  items: readonly ListItem[],
  focusedIndex: number,
) => (items[focusedIndex] == null ? undefined : items[focusedIndex].id);

const toSearchableItem = (item: Item, index: number): ListItem => ({
  ...item,
  id: createDomId('list-item'),
  matches: [],
  ordinal: index,
});

const wrapIndex = (index: number, length: number): number =>
  circularClamp(index, 0, length);

export interface State<T extends ListItem = ListItem> {
  activeDescendant: string | undefined;
  allItems: readonly T[];
  filterStrategy(items: readonly Item[], filter: string): readonly T[];
  focusedIndex: number;
  items: readonly T[];
  searchQuery: string;
}

export const init = (payload: {
  filterStrategy(items: readonly Item[], filter: string): readonly ListItem[];
  items: readonly Item[];
  searchQuery: string;
}): State => {
  // TODO: is `setItems` needed now?
  const allItems = payload.items.map(toSearchableItem);
  const items = payload.filterStrategy(allItems, payload.searchQuery);
  const focusedIndex = 0;

  return {
    activeDescendant: getActiveDescendant(items, focusedIndex),
    allItems,
    filterStrategy: payload.filterStrategy,
    focusedIndex,
    items,
    searchQuery: payload.searchQuery,
  };
};

export const moveFocus = (payload: DeltaOrIndex): MoveFocusAction => ({
  type: ActionType.MoveFocus,
  payload,
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
      const index =
        'delta' in action.payload
          ? action.payload.delta + state.focusedIndex
          : action.payload.index;

      const focusedIndex = wrapIndex(index, state.items.length);
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
      const items = state.filterStrategy(state.allItems, searchQuery);
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
      const items = state.filterStrategy(allItems, state.searchQuery);
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
