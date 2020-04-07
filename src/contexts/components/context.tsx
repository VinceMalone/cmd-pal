import * as React from 'react';

import { Components } from './type';

const defaults: Partial<Components> = {};

const ComponentsContext = React.createContext(defaults);

export function useComponent<T extends keyof Components>(
  name: T,
  as?: Components[T],
): Components[T] | undefined;

export function useComponent<T extends keyof Components>(
  name: T,
  as: Components[T] | undefined,
  fallback: Components[T],
): Components[T];

export function useComponent<T extends keyof Components>(
  name: T,
  as?: Components[T],
  fallback?: Components[T],
) {
  const components = React.useContext(ComponentsContext);
  // Asserting type as `unknown` to suppress [ts(2590)] "Expression produces a union type that is too complex to represent."
  const component = components[name] as unknown;
  return as ?? component ?? fallback;
}

export interface ComponentsProviderProps {
  children: React.ReactNode;
  components?: Partial<Components>;
}

export const ComponentsProvider: React.FC<ComponentsProviderProps> = ({
  children,
  components = defaults,
}) => (
  <ComponentsContext.Provider value={components}>
    {children}
  </ComponentsContext.Provider>
);
