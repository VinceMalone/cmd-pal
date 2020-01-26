import * as tb from 'ts-toolbelt';

import { Functionable } from './Functionable';

export interface Part {
  id: string;
  isMatch: boolean;
  value: string;
}

//

export interface Item {
  label: string;
}

interface Searchable {
  matches: [number, number][];
}

export interface ListItem extends Item, Searchable {
  id: string;
}

//

export interface Choice<In> extends Item {
  resolve: Functionable<tb.M.Promisable<string>, [In]>;
}

export interface ChoiceListItem<In = unknown> extends Choice<In>, ListItem {}

// TODO: maybe isn't defined here; rather in the only file it's used in
export type Choices<In> = Functionable<
  tb.M.Promisable<readonly Choice<In>[]>,
  [In]
>;
