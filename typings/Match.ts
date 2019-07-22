export interface Match {
  indices: [number, number][];
}

export interface Part {
  id: string;
  isMatch: boolean;
  value: string;
}
