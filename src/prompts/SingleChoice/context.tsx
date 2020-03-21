import * as React from 'react';

import { ListProvider } from '../../contexts/list';
import { Choice } from '../../types/Choice';

// Intentionally using `any` to avoid making the context generic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyChoice = Choice<any, any>;

interface SingleChoicePromptContextValue {
  submit(choice: AnyChoice): void;
}

export const SingleChoicePromptContext = React.createContext<SingleChoicePromptContextValue | null>(
  null,
);

export const useSingleChoicePromptContext = () => {
  const context = React.useContext(SingleChoicePromptContext);
  if (context === null) {
    throw new Error(
      'useSingleChoicePromptContext must be used inside a SingleChoicePromptContextProvider',
    );
  }
  return context;
};

export interface SingleChoicePromptContextProviderProps {
  children?: React.ReactNode;
  choices: readonly AnyChoice[];
  onSubmit(choice: AnyChoice): void;
}

export const SingleChoicePromptContextProvider: React.FC<SingleChoicePromptContextProviderProps> = ({
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
      <SingleChoicePromptContext.Provider value={context}>
        {children}
      </SingleChoicePromptContext.Provider>
    </ListProvider>
  );
};
