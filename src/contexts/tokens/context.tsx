import * as React from 'react';

import { Token } from '../../types/Token';

import * as duck from './duck';

interface TokensContextValue {
  dispatch: React.Dispatch<duck.Actions>;
  state: duck.State;
}

export const TokensContext = React.createContext<TokensContextValue | null>(
  null,
);

export const useTokensContext = () => {
  const context = React.useContext(TokensContext);
  if (context === null) {
    throw new Error('useTokensContext must be used inside a TokensProvider');
  }
  return context;
};

export interface TokensProviderProps {
  children?: React.ReactNode;
  tokens?: readonly Token[];
}

export const TokensProvider: React.FC<TokensProviderProps> = ({
  children,
  tokens = [],
}) => {
  const [state, dispatch] = React.useReducer(duck.reducer, tokens, duck.init);
  const context = React.useMemo(() => ({ dispatch, state }), [state]);

  return (
    <TokensContext.Provider value={context}>{children}</TokensContext.Provider>
  );
};
