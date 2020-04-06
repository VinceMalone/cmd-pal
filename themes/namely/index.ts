import { HelpText as Message } from './HelpText';
import { Input as Textbox } from './Input';
import { Item as Option } from './Item';
import { List as OptionList } from './List';
import { Mark } from './Mark';
import { Progress } from './Progress';
import { Surround as Dialog } from './Surround';

export const components = {
  Dialog,
  Mark,
  Message,
  Option,
  OptionList,
  Progress,
  Textbox,
};

export const theme = {
  maxWidth: '37.5rem',
  offsetTop: '2rem',
  offsetSides: '2rem',
  zIndex: 999999,
};
