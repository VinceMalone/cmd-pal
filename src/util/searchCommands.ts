import * as Fuse from 'fuse.js';

import { CommandItem } from '../../typings/Command';

export default function searchCommands(commands: CommandItem[], query: string): CommandItem[] {
  if (query.trim() === '') {
    return commands;
  }

  const fuse = new Fuse(commands, {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['category', 'description'],
  });

  return fuse.search(query).map(({ item, matches }) => ({ ...item, matches }));
}
