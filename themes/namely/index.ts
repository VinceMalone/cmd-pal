import { HelpText } from './HelpText';
import { Input } from './Input';
import { Item as Option } from './Item'; // TODO
import { List } from './List';
import { Mark } from './Mark';
import { Progress } from './Progress';
import { Surround } from './Surround';

export const components = {
  HelpText,
  Input,
  List,
  Mark,
  Option,
  Progress,
  Surround,
};

export const theme = {
  maxHeight: '4rem',
  maxWidth: '37.5rem',
  offsetTop: '2rem',
  offsetSides: '2rem',
  progressOffset: '1rem',
  zIndex: 999999,
};
