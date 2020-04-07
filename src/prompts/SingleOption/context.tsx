import * as React from 'react';

import { ListProvider } from '../../contexts/list';
import { OptionBag } from '../../types/Option';

// Intentionally using `any` to avoid making the context generic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyOption = OptionBag<any, any>;

interface SingleOptionPromptContextValue {
  submit(option: AnyOption): void;
}

export const SingleOptionPromptContext = React.createContext<SingleOptionPromptContextValue | null>(
  null,
);

export const useSingleOptionPromptContext = () => {
  const context = React.useContext(SingleOptionPromptContext);
  if (context === null) {
    throw new Error(
      'useSingleOptionPromptContext must be used inside a SingleOptionPromptContextProvider',
    );
  }
  return context;
};

export interface SingleOptionPromptContextProviderProps {
  children?: React.ReactNode;
  onSubmit(option: AnyOption): void;
  options: readonly AnyOption[];
}

export const SingleOptionPromptContextProvider: React.FC<SingleOptionPromptContextProviderProps> = ({
  children,
  onSubmit,
  options,
}) => {
  const context = React.useMemo(
    () => ({
      submit: onSubmit,
    }),
    [onSubmit],
  );

  return (
    <ListProvider options={options}>
      <SingleOptionPromptContext.Provider value={context}>
        {children}
      </SingleOptionPromptContext.Provider>
    </ListProvider>
  );
};
