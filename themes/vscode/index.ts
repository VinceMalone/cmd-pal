import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { Dialog } from './Dialog';
import { Header } from './Header';
import { Hint } from './Hint';
import { Kbd } from './Kbd';
import { Mark } from './Mark';
import { Message } from './Message';
import { Option } from './Option';
import { OptionList } from './OptionList';
import { Paragraph } from './Paragraph';
import { Textbox } from './Textbox';
import { Token } from './Token';
import { TokenField } from './TokenField';
import { VisualCheckbox } from './VisualCheckbox';

export const components = {
  Button,
  Dialog,
  Header,
  Hint,
  Kbd,
  Mark,
  Message,
  Option,
  OptionList,
  Paragraph,
  Textbox,
  Token,
  TokenField,

  // Confirm
  ConfirmPromptButtonGroup: ButtonGroup,

  // MultiOption
  MultiOptionPromptCheckbox: VisualCheckbox,
};

export const theme = {
  maxWidth: '37.5rem',
  offsetTop: '2rem',
  offsetSides: '2rem',
  zIndex: 999999,
};
