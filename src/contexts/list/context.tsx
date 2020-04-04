import * as React from 'react';

import { useExperiments } from '../../components/Experiments';
import { Item, ListItem } from '../../types/List';
import { filterItemsCDT, filterItemsVSC } from '../../utils/filterItems';

import * as duck from './duck';

interface ListRef {
  itemHeight: number;
  listHeight: number;
  scrollOffset: number;
  scrollToItem?(index: number): void;
}

interface ListContextValue<T extends ListItem = ListItem> {
  dispatch: React.Dispatch<duck.Actions>;
  ref: React.MutableRefObject<ListRef>;
  state: duck.State<T>;
}

export const ListContext = React.createContext<ListContextValue | null>(null);

export const useListContext = <T extends ListItem = ListItem>() => {
  const context = React.useContext(
    (ListContext as unknown) as React.Context<ListContextValue<T>>,
  );
  if (context === null) {
    throw new Error('useListContext must be used inside a ListProvider');
  }
  return context;
};

export interface ListProviderProps {
  children?: React.ReactNode;
  items: readonly Item[];
  searchQuery?: string;
}

export const ListProvider: React.FC<ListProviderProps> = ({
  children,
  items,
  searchQuery = '',
}) => {
  const { experiment } = useExperiments();
  const filterStrategy = experiment('FILTER_ALGORITHM', 'CDT')
    ? filterItemsCDT
    : filterItemsVSC;

  const [state, dispatch] = React.useReducer(
    duck.reducer,
    {
      filterStrategy,
      items,
      searchQuery,
    },
    duck.init,
  );

  const ref = React.useRef<ListRef>({
    itemHeight: 0,
    listHeight: 0,
    scrollOffset: 0,
  });

  const context: ListContextValue = React.useMemo(
    () => ({ dispatch, ref, state }),
    [state],
  );

  return (
    <ListContext.Provider value={context}>{children}</ListContext.Provider>
  );
};
