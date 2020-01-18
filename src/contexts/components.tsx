import * as React from 'react';

interface Components {
  Surround?: React.ComponentType;
  HelpText?: React.ComponentType;
  Input?: React.ComponentType;
  List?: React.ComponentType;
  Mark?: React.ComponentType;
  Option?: React.ComponentType;
  Progress?: React.ComponentType;
}

export const Context = React.createContext<Components>({
  Surround: undefined,
  HelpText: undefined,
  Input: undefined,
  List: undefined,
  Mark: undefined,
  Option: undefined,
  Progress: undefined,
});

export const useComponents = () => React.useContext(Context);

export const ComponentsProvider = ({
  children,
  components,
}: {
  children: React.ReactNode;
  components: Components;
}) => <Context.Provider value={components}>{children}</Context.Provider>;
