export interface Match {
  end: number;
  start: number;
}

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
  matches: Match[];
}

export interface ListItem extends Item, Searchable {
  id: string;
  ordinal: number;
}
