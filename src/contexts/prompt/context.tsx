import * as React from 'react';
import * as tb from 'ts-toolbelt';

// Intentionally using `any` to avoid making the context generic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface PromptContextValue<In = any, Out = any> {
  onCommit(value: tb.M.Promisable<Out>): Promise<void>;
  onExit(): void;
  value: In;
}

export const PromptContext = React.createContext<PromptContextValue>({
  onCommit: async () => undefined,
  onExit: () => undefined,
  value: null,
});

export const usePromptContext = () => React.useContext(PromptContext);

export interface PromptProviderProps extends PromptContextValue {
  children?: React.ReactNode;
}

export const PromptProvider: React.FC<PromptProviderProps> = ({
  children,
  onCommit,
  onExit,
  value,
}) => {
  const context = React.useMemo(() => ({ onCommit, onExit, value }), [
    onCommit,
    onExit,
    value,
  ]);

  return (
    <PromptContext.Provider value={context}>{children}</PromptContext.Provider>
  );
};
