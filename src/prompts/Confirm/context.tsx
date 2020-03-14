import * as React from 'react';

interface ConfirmPromptContextValue {
  confirmed: boolean;
  setConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  submit(confirmed: boolean): void;
}

export const ConfirmPromptContext = React.createContext<ConfirmPromptContextValue | null>(
  null,
);

export const useConfirmPromptContext = () => {
  const context = React.useContext(ConfirmPromptContext);
  if (context === null) {
    throw new Error(
      'useConfirmPromptContext must be used inside a ConfirmPromptContextProvider',
    );
  }
  return context;
};

export interface ConfirmPromptContextProviderProps {
  children?: React.ReactNode;
  initialValue?: boolean;
  onSubmit(confirmed: boolean): void;
}

export const ConfirmPromptContextProvider: React.FC<ConfirmPromptContextProviderProps> = ({
  children,
  initialValue = false,
  onSubmit,
}) => {
  const [confirmed, setConfirmed] = React.useState(initialValue);

  const context = React.useMemo(
    () => ({
      confirmed,
      setConfirmed,
      submit: onSubmit,
    }),
    [confirmed, onSubmit],
  );

  return (
    <ConfirmPromptContext.Provider value={context}>
      {children}
    </ConfirmPromptContext.Provider>
  );
};
