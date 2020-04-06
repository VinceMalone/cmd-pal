import * as React from 'react';

import { ButtonComponent } from '../components/base/Button';
import { DialogComponent } from '../components/base/Dialog';
import { ErrorMessageComponent } from '../components/base/ErrorMessage';
import { HeaderComponent } from '../components/base/Header';
import { HintComponent } from '../components/base/Hint';
import { KbdComponent } from '../components/base/Kbd';
import { MarkComponent } from '../components/base/Mark';
import { MessageComponent } from '../components/base/Message';
import { OptionComponent } from '../components/base/Option';
import { OptionListComponent } from '../components/base/OptionList';
import { ParagraphComponent } from '../components/base/Paragraph';
import { ProgressComponent } from '../components/base/Progress';
import { TextboxComponent } from '../components/base/Textbox';
import { TextboxTokenComponent } from '../components/base/TextboxToken';
import { TokenComponent } from '../components/base/Token';
import { TokenFieldComponent } from '../components/base/TokenField';
// Prompt
import { ConfirmPromptButtonGroupComponent } from '../prompts/Confirm/ConfirmPromptButtonGroup';
import { MultiOptionPromptCheckboxComponent } from '../prompts/MultiOption/MultiOptionPromptCheckbox';
import { MultiOptionPromptHintComponent } from '../prompts/MultiOption/MultiOptionPromptHint';

interface Components {
  Button: ButtonComponent;
  Dialog: DialogComponent;
  ErrorMessage: ErrorMessageComponent;
  Header: HeaderComponent;
  Hint: HintComponent;
  Kbd: KbdComponent;
  Mark: MarkComponent;
  Message: MessageComponent;
  Option: OptionComponent;
  OptionList: OptionListComponent;
  Paragraph: ParagraphComponent;
  Progress: ProgressComponent;
  Textbox: TextboxComponent;
  TextboxToken: TextboxTokenComponent;
  Token: TokenComponent;
  TokenField: TokenFieldComponent;

  // Prompts

  // Confirm
  ConfirmPromptButtonGroup: ConfirmPromptButtonGroupComponent;

  // MultiOption
  MultiOptionPromptCheckbox: MultiOptionPromptCheckboxComponent;
  MultiOptionPromptHint: MultiOptionPromptHintComponent;
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
  // Asserting type as `unknown` to suppress [ts(2590)] "Expression produces a union type that is too complex to represent."
  const component = components[name] as unknown;
  return as ?? component ?? fallback;
}

export const ComponentsProvider = ({
  children,
  components = defaults,
}: {
  children: React.ReactNode;
  components: Partial<Components>;
}) => <Context.Provider value={components}>{children}</Context.Provider>;
