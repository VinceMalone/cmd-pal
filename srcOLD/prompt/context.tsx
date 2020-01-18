import * as React from 'react';

interface PromptContextValue {
  close(): void;
  exec(index: number): void;
  open(): void;
  setProgress(inProgress: boolean): void;
  state: {
    inProgress: boolean;
    isOpen: boolean;
  };
}

const notImplemented = () => {
  throw new Error('TODO');
};

export const PromptContext = React.createContext<PromptContextValue>({
  close: notImplemented,
  exec: notImplemented,
  open: notImplemented,
  setProgress: notImplemented,
  state: {
    inProgress: false,
    isOpen: false,
  },
});

export const usePromptContext = () => React.useContext(PromptContext);

export interface PromptProviderProps {
  children?: React.ReactNode;
}

export const PromptProvider: React.FC<PromptProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inProgress, setInProgress] = React.useState(false);

  const close = React.useCallback(() => setIsOpen(false), []);
  const open = React.useCallback(() => setIsOpen(true), []);

  const exec = React.useCallback((index: number) => {
    setInProgress(true);
    console.log(`EXEC: ${index}`); // TODO
  }, []);

  const context = React.useMemo(
    () => ({
      close,
      exec,
      open,
      setProgress: setInProgress,
      state: {
        inProgress,
        isOpen,
      },
    }),
    [close, exec, inProgress, isOpen, open],
  );

  return (
    <PromptContext.Provider value={context}>{children}</PromptContext.Provider>
  );
};
