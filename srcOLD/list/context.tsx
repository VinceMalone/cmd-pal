import * as React from 'react';

import * as duck from './duck';

interface ListContextValue {
  dispatch: React.Dispatch<duck.Actions>;
  state: duck.State;
}

export const ListContext = React.createContext<ListContextValue>({
  dispatch: () => {
    throw new Error(`"list" context doesn't have a provider`);
  },
  state: duck.initialState,
});

export const useListContext = () => React.useContext(ListContext);

export interface ListProviderProps {
  children?: React.ReactNode;
}

export const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(duck.reducer, duck.initialState);
  const context = React.useMemo(() => ({ dispatch, state }), [state]);

  return (
    <ListContext.Provider value={context}>{children}</ListContext.Provider>
  );
};
