import * as React from 'react';

import { Item, ListItem } from '../../types/List';

import * as duck from './duck';

interface ListContextValue<T extends ListItem = ListItem> {
  dispatch: React.Dispatch<duck.Actions>;
  state: duck.State<T>;
}

export const ListContext = React.createContext<ListContextValue>({
  dispatch: () => {
    throw new Error(`"List" context doesn't have a provider`);
  },
  state: duck.init({ items: [], searchQuery: '' }),
});

export const useListContext = <T extends ListItem = ListItem>() =>
  React.useContext(
    (ListContext as unknown) as React.Context<ListContextValue<T>>,
  );

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
  const [state, dispatch] = React.useReducer(
    duck.reducer,
    { items, searchQuery },
    duck.init,
  );

  const context = React.useMemo(() => ({ dispatch, state }), [state]);

  return (
    <ListContext.Provider value={context}>{children}</ListContext.Provider>
  );
};
