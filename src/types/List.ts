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
  // realIndex: number; // TODO
}
