import * as React from 'react';

import { ListProvider } from '../../contexts/list';
import { TokensProvider } from '../../contexts/tokens';
import { OptionBag } from '../../types/Option';

// Intentionally using `any` to avoid making the context generic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Options = readonly OptionBag<any, any>[];

interface MultiOptionPromptContextValue {
  submit(selected: Options): void;
}

export const MultiOptionPromptContext = React.createContext<MultiOptionPromptContextValue | null>(
  null,
);

export const useMultiOptionPromptContext = () => {
  const context = React.useContext(MultiOptionPromptContext);
  if (context === null) {
    throw new Error(
      'useMultiOptionPromptContext must be used inside a MultiOptionPromptContextProvider',
    );
  }
  return context;
};

export interface MultiOptionPromptContextProviderProps {
  children?: React.ReactNode;
  onSubmit(selected: Options): void;
  options: Options;
}

export const MultiOptionPromptContextProvider: React.FC<MultiOptionPromptContextProviderProps> = ({
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
      <TokensProvider>
        <MultiOptionPromptContext.Provider value={context}>
          {children}
        </MultiOptionPromptContext.Provider>
      </TokensProvider>
    </ListProvider>
  );
};
