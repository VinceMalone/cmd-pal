import { Components } from '../../src/contexts/components/type';

import { HelpText as Message } from './HelpText';
import { Input as Textbox } from './Input';
import { Item as Option } from './Item';
import { List as OptionList } from './List';
import { Mark } from './Mark';
import { Progress } from './Progress';
import { Surround as Dialog } from './Surround';

export const components: Partial<Components> = {
  Dialog,
  Mark,
  Message,
  Option,
  OptionList,
  Progress,
  Textbox,
};
