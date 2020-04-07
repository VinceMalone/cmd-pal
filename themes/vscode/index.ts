import { Components } from '../../src/contexts/components/type';

import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { Dialog } from './Dialog';
import { ErrorMessage } from './ErrorMessage';
import { Header } from './Header';
import { Hint } from './Hint';
import { Kbd } from './Kbd';
import { Mark } from './Mark';
import { Message } from './Message';
import { Option } from './Option';
import { OptionList } from './OptionList';
import { Paragraph } from './Paragraph';
import { Progress } from './Progress';
import { Textbox } from './Textbox';
import { Token } from './Token';
import { TokenField } from './TokenField';
import { VisualCheckbox } from './VisualCheckbox';

export const components: Partial<Components> = {
  Button,
  Dialog,
  ErrorMessage,
  Header,
  Hint,
  Kbd,
  Mark,
  Message,
  Option,
  OptionList,
  Paragraph,
  Progress,
  Textbox,
  Token,
  TokenField,

  // Confirm
  ConfirmPromptButtonGroup: ButtonGroup,

  // MultiOption
  MultiOptionPromptCheckbox: VisualCheckbox,
};
