import * as React from 'react';

interface TextPromptContextValue {
  initialValue?: string;
  message: string;
  submit(value: string): void;
  placeholder?: string;
}

export const TextPromptContext = React.createContext<TextPromptContextValue | null>(
  null,
);

export const useTextPromptContext = () => {
  const context = React.useContext(TextPromptContext);
  if (context === null) {
    throw new Error(
      'useTextPromptContext must be used inside a TextPromptContextProvider',
    );
  }
  return context;
};

export interface TextPromptContextProviderProps {
  children?: React.ReactNode;
  initialValue?: string;
  message: string;
  onSubmit(value: string): void;
  placeholder?: string;
}

export const TextPromptContextProvider: React.FC<TextPromptContextProviderProps> = ({
  children,
  initialValue,
  message,
  onSubmit,
  placeholder,
}) => {
  const context = React.useMemo(
    () => ({
      initialValue,
      message,
      placeholder,
      submit: onSubmit,
    }),
    [initialValue, message, onSubmit, placeholder],
  );

  return (
    <TextPromptContext.Provider value={context}>
      {children}
    </TextPromptContext.Provider>
  );
};
