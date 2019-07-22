import * as React from 'react';
import { createContext, useContext } from 'react';

interface Components {
  Surround?: React.ComponentType<{ className?: string }>;
  Input?: React.ComponentType<{ className?: string }>;
  Item?: React.ComponentType;
  List?: React.ComponentType<{ className?: string }>;
  Mark?: React.ComponentType;
  Progress?: React.ComponentType;
}

export const Context = createContext<Components>({
  Surround: undefined,
  Input: undefined,
  Item: undefined,
  List: undefined,
  Mark: undefined,
  Progress: undefined,
});

export const useComponents = () => useContext(Context);

export const ComponentsProvider = ({
  children,
  components,
}: {
  children: React.ReactNode;
  components: Components;
}) => <Context.Provider value={components}>{children}</Context.Provider>;
