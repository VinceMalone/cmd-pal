import * as React from 'react';

import { ListProvider } from '../../contexts/list';
import { TokensProvider } from '../../contexts/tokens';
import { Choice } from '../../types/Choice';

// Intentionally using `any` to avoid making the context generic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Choices = readonly Choice<any, any>[];

interface MultiChoicePromptContextValue {
  submit(chosen: Choices): void;
}

export const MultiChoicePromptContext = React.createContext<MultiChoicePromptContextValue | null>(
  null,
);

export const useMultiChoicePromptContext = () => {
  const context = React.useContext(MultiChoicePromptContext);
  if (context === null) {
    throw new Error(
      'useMultiChoicePromptContext must be used inside a MultiChoicePromptContextProvider',
    );
  }
  return context;
};

export interface MultiChoicePromptContextProviderProps {
  children?: React.ReactNode;
  choices: Choices;
  onSubmit(chosen: Choices): void;
}

export const MultiChoicePromptContextProvider: React.FC<MultiChoicePromptContextProviderProps> = ({
  children,
  choices,
  onSubmit,
}) => {
  const context = React.useMemo(
    () => ({
      submit: onSubmit,
    }),
    [onSubmit],
  );

  return (
    <ListProvider items={choices}>
      <TokensProvider>
        <MultiChoicePromptContext.Provider value={context}>
          {children}
        </MultiChoicePromptContext.Provider>
      </TokensProvider>
    </ListProvider>
  );
};
