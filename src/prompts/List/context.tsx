import * as React from 'react';

import { TokensProvider } from '../../contexts/tokens';

interface ListPromptContextValue {
  submit(list: string[]): void;
}

export const ListPromptContext = React.createContext<ListPromptContextValue | null>(
  null,
);

export const useListPromptContext = () => {
  const context = React.useContext(ListPromptContext);
  if (context === null) {
    throw new Error(
      'useListPromptContext must be used inside a ListPromptContextProvider',
    );
  }
  return context;
};

export interface ListPromptContextProviderProps {
  children?: React.ReactNode;
  initialValue?: readonly string[];
  onSubmit(list: string[]): void;
}

export const ListPromptContextProvider: React.FC<ListPromptContextProviderProps> = ({
  children,
  initialValue,
  onSubmit,
}) => {
  const context = React.useMemo(
    () => ({
      submit: onSubmit,
    }),
    [onSubmit],
  );

  const tokens = React.useMemo(
    () =>
      // TODO: dedupe?
      initialValue?.map(value => ({
        id: value,
        label: value,
      })),
    [initialValue],
  );

  return (
    <TokensProvider tokens={tokens}>
      <ListPromptContext.Provider value={context}>
        {children}
      </ListPromptContext.Provider>
    </TokensProvider>
  );
};
