import { Action } from '../../types/Action';
import { Item, ListItem } from '../../types/List';
import { circularClamp } from '../../utils/circularClamp';
import { createDomId } from '../../utils/domId';

type LI<I> = I & ListItem;

enum ActionType {
  Filter = 'FILTER',
  MoveFocus = 'MOVE_FOCUS',
}

type DeltaOrIndex = { delta: number } | { index: number };

type FilterAction = Action<ActionType.Filter, string>;
type MoveFocusAction = Action<ActionType.MoveFocus, DeltaOrIndex>;

export type Actions = FilterAction | MoveFocusAction;

const getActiveDescendant = (
  items: readonly ListItem[],
  focusedIndex: number,
) => (items[focusedIndex] == null ? undefined : items[focusedIndex].id);

const createListItem = <T extends Item>(item: T, index: number): LI<T> => ({
  ...item,
  id: createDomId('list-item'),
  matches: [],
  ordinal: index,
});

export interface State<T extends Item> {
  activeDescendant: string | undefined;
  allItems: readonly LI<T>[];
  filterStrategy(items: readonly LI<T>[], filter: string): readonly LI<T>[];
  filterTerm: string;
  focusedIndex: number;
  items: readonly LI<T>[];
}

export interface InitProps<T extends Item> {
  filterStrategy(items: readonly LI<T>[], filter: string): readonly LI<T>[];
  initialfilterTerm: string;
  items: readonly T[];
}

export const init = <T extends Item>(props: InitProps<T>): State<T> => {
  const allItems = props.items.map(createListItem);
  const items = props.filterStrategy(allItems, props.initialfilterTerm);
  const focusedIndex = 0;

  return {
    activeDescendant: getActiveDescendant(items, focusedIndex),
    allItems,
    filterStrategy: props.filterStrategy,
    filterTerm: props.initialfilterTerm,
    focusedIndex,
    items,
  };
};

export const filter = (query: string): FilterAction => ({
  type: ActionType.Filter,
  payload: query,
});

export const moveFocus = (payload: DeltaOrIndex): MoveFocusAction => ({
  type: ActionType.MoveFocus,
  payload,
});

export const reducer = <T extends Item>(
  state: State<T>,
  action: Actions,
): State<T> => {
  switch (action.type) {
    case ActionType.Filter: {
      const filterTerm = action.payload;
      const items = state.filterStrategy(state.allItems, filterTerm);
      // Don't reset the focused index if the filter term didn't change the results
      const focusedIndex = items === state.items ? state.focusedIndex : 0;

      return {
        ...state,
        activeDescendant: getActiveDescendant(items, focusedIndex),
        items,
        filterTerm,
        focusedIndex,
      };
    }

    case ActionType.MoveFocus: {
      const index =
        'delta' in action.payload
          ? action.payload.delta + state.focusedIndex
          : action.payload.index;

      const focusedIndex = circularClamp(index, 0, state.items.length);
      const activeDescendant = getActiveDescendant(state.items, focusedIndex);

      return {
        ...state,
        activeDescendant,
        focusedIndex,
      };
    }

    default: {
      throw new Error('action not found');
    }
  }
};
