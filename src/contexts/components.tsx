import * as React from 'react';

import { ButtonComponent } from '../components/base/Button';
import { DialogComponent } from '../components/base/Dialog';
import { MarkComponent } from '../components/base/Mark';
import { OptionComponent } from '../components/base/Option';
import { OptionListComponent } from '../components/base/OptionList';
import { ParagraphComponent } from '../components/base/Paragraph';
import { ProgressComponent } from '../components/base/Progress';
import { TextboxComponent } from '../components/base/Textbox';
import { TextboxTokenComponent } from '../components/base/TextboxToken';
import { TokenComponent } from '../components/base/Token';
import { TokenFieldComponent } from '../components/base/TokenField';

interface Components {
  Button: ButtonComponent;
  Dialog: DialogComponent;
  Mark: MarkComponent;
  Option: OptionComponent;
  OptionList: OptionListComponent;
  Paragraph: ParagraphComponent;
  Progress: ProgressComponent;
  Textbox: TextboxComponent;
  TextboxToken: TextboxTokenComponent;
  Token: TokenComponent;
  TokenField: TokenFieldComponent;
}

const defaults: Partial<Components> = {};

export const Context = React.createContext(defaults);

export const useComponents = () => React.useContext(Context);

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
  const components = useComponents();
  return as ?? components[name] ?? fallback;
}

export const ComponentsProvider = ({
  children,
  components = defaults,
}: {
  children: React.ReactNode;
  components: Partial<Components>;
}) => <Context.Provider value={components}>{children}</Context.Provider>;
