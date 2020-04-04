import { ListItem } from '../../../types/List';

import {
  matchesContiguousSubString,
  matchesPrefix,
  matchesWords,
  or,
} from './filters';

const WORD_FILTER = or(matchesPrefix, matchesWords, matchesContiguousSubString);

export const filterItemsVSC = <T extends ListItem>(
  items: readonly T[],
  filter: string,
): readonly T[] => {
  if (filter.trim() === '') {
    return items;
  }

  const results: T[] = [];

  for (const item of items) {
    const matches = WORD_FILTER(filter, item.label);

    if (matches != null) {
      results.push({
        ...item,
        matches,
      });
    }
  }

  return results;
};
