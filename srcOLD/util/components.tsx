import * as React from 'react';
import { createContext, useContext } from 'react';

interface Components {
  Surround?: React.ComponentType;
  HelpText?: React.ComponentType;
  Input?: React.ComponentType<
    React.RefAttributes<HTMLInputElement> &
      React.InputHTMLAttributes<HTMLInputElement>
  >;
  List?: React.ComponentType<
    React.RefAttributes<HTMLElement> & { role: string; tabIndex: number }
  >;
  Mark?: React.ComponentType;
  Option?: React.ComponentType;
  Progress?: React.ComponentType;
}

export const Context = createContext<Components>({
  Surround: undefined,
  HelpText: undefined,
  Input: undefined,
  List: undefined,
  Mark: undefined,
  Option: undefined,
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
