import * as React from 'react';

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
  initialValue = [],
  onSubmit,
}) => {
  // const [list, setList] = React.useState(initialValue);

  const context = React.useMemo(
    () => ({
      submit: onSubmit,
    }),
    [onSubmit],
  );

  return (
    <ListPromptContext.Provider value={context}>
      {children}
    </ListPromptContext.Provider>
  );
};
