import { HelpText } from './HelpText';
import { Input } from './Input';
import { Item as Option } from './Item'; // TODO
import { List } from './List';
import { Mark } from './Mark';
import { Message } from './Message';
import { Progress } from './Progress';
import { Surround } from './Surround';
import { Token } from './Token';
import { TokenGroup } from './TokenGroup';
import { TokenInput } from './TokenInput';

export const components = {
  HelpText,
  Input,
  List,
  Mark,
  Message,
  Option,
  Progress,
  Surround,
  Token,
  TokenGroup,
  TokenInput,
};

export const theme = {
  maxHeight: '4rem',
  maxWidth: '37.5rem',
  offsetTop: '2rem',
  offsetSides: '2rem',
  progressOffset: '1rem',
  zIndex: 999999,
};
