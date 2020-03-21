import * as React from 'react';

interface Components {
  Surround?: React.ComponentType;
  HelpText?: React.ComponentType;
  Input?: React.ComponentType;
  List?: React.ComponentType;
  Mark?: React.ComponentType;
  Message?: React.ComponentType;
  Option?: React.ComponentType;
  Progress?: React.ComponentType;
  Token?: React.ComponentType<
    // TODO: share this
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      'aria-label': string;
      focused: boolean;
    }
  >;
  TokenGroup?: React.ComponentType;
  TokenInput?: React.ComponentType;
}

const defaults: Components = {};

export const Context = React.createContext<Components>({
  Surround: undefined,
  HelpText: undefined,
  Input: undefined,
  List: undefined,
  Mark: undefined,
  Option: undefined,
  Progress: undefined,
  Token: undefined,
  TokenGroup: undefined,
  TokenInput: undefined,
});

export const useComponents = () => React.useContext(Context);

export const ComponentsProvider = ({
  children,
  components = defaults,
}: {
  children: React.ReactNode;
  components: Components;
}) => <Context.Provider value={components}>{children}</Context.Provider>;
