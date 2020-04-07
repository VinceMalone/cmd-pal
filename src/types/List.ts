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

export interface ListItem extends Item {
  id: string;
  matches: Match[];
  ordinal: number;
}
