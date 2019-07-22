import { Match } from './Match';

export interface Command {
  category?: string;
  description: string;
  exec: () => Promise<unknown>;
  id: string;
}

export interface CommandItem extends Command {
  matches: Match[];
}
