import * as React from 'react';

import { useExperiments } from '../../components/Experiments';
import { OptionBag } from '../../types/Option';
import { filterItemsCDT, filterItemsVSC } from '../../utils/filterItems';

import * as duck from './duck';

type Option = OptionBag<unknown, unknown>;

interface ListRef {
  itemHeight: number;
  listHeight: number;
  scrollOffset: number;
  scrollToItem?(index: number): void;
}

interface ListContextValue {
  dispatch: React.Dispatch<duck.Actions>;
  ref: React.MutableRefObject<ListRef>;
  state: duck.State<Option>;
}

export const ListContext = React.createContext<ListContextValue | null>(null);

export const useListContext = () => {
  const context = React.useContext(ListContext);
  if (context === null) {
    throw new Error('useListContext must be used inside a ListProvider');
  }
  return context;
};

export interface ListProviderProps {
  children?: React.ReactNode;
  initialfilterTerm?: string;
  options: readonly Option[];
}

export const ListProvider: React.FC<ListProviderProps> = ({
  children,
  initialfilterTerm = '',
  options,
}) => {
  const { experiment } = useExperiments();
  const filterStrategy = experiment('FILTER_ALGORITHM', 'CDT')
    ? filterItemsCDT
    : filterItemsVSC;

  const [state, dispatch] = React.useReducer<
    React.Reducer<duck.State<Option>, duck.Actions>,
    duck.InitProps<Option>
  >(
    duck.reducer,
    {
      filterStrategy,
      initialfilterTerm,
      items: options,
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
