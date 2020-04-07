import { ButtonComponent } from '../../components/base/Button';
import { DialogComponent } from '../../components/base/Dialog';
import { ErrorMessageComponent } from '../../components/base/ErrorMessage';
import { HeaderComponent } from '../../components/base/Header';
import { HintComponent } from '../../components/base/Hint';
import { KbdComponent } from '../../components/base/Kbd';
import { MarkComponent } from '../../components/base/Mark';
import { MessageComponent } from '../../components/base/Message';
import { OptionComponent } from '../../components/base/Option';
import { OptionListComponent } from '../../components/base/OptionList';
import { ParagraphComponent } from '../../components/base/Paragraph';
import { ProgressComponent } from '../../components/base/Progress';
import { TextboxComponent } from '../../components/base/Textbox';
import { TextboxTokenComponent } from '../../components/base/TextboxToken';
import { TokenComponent } from '../../components/base/Token';
import { TokenFieldComponent } from '../../components/base/TokenField';
// Prompts
import { ConfirmPromptButtonComponent } from '../../prompts/Confirm/ConfirmPromptButton';
import { ConfirmPromptButtonGroupComponent } from '../../prompts/Confirm/ConfirmPromptButtonGroup';
import { MultiOptionPromptCheckboxComponent } from '../../prompts/MultiOption/MultiOptionPromptCheckbox';
import { MultiOptionPromptHintComponent } from '../../prompts/MultiOption/MultiOptionPromptHint';

export interface Components {
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
  ConfirmPromptButton: ConfirmPromptButtonComponent;
  ConfirmPromptButtonGroup: ConfirmPromptButtonGroupComponent;

  // MultiOption
  MultiOptionPromptCheckbox: MultiOptionPromptCheckboxComponent;
  MultiOptionPromptHint: MultiOptionPromptHintComponent;
}
