import * as tb from 'ts-toolbelt';

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

export interface Choice extends Item {
  value: string;
}

export interface ChoiceListItem extends Choice, ListItem {}

export type Choices<In> =
  | readonly Choice[]
  | tb.F.Function<[In], tb.M.Promisable<readonly Choice[]>>;

export interface Command extends Item {}
