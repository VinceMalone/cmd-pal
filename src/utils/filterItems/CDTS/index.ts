import { ListItem, Match } from '../../../types/List';

import { peekLast, upperBound } from './array';
import { DiffWrapper, Operation } from './diff';
import { clamp, createFilterRegex } from './utils';

/**
 * OBSOLETE
 * delete this
 *
 * Implements the "quick open" filter algorithm (with scoring) from Chrome Dev Tools
 * https://github.com/ChromeDevTools/devtools-frontend/blob/7ff61c6fba289f3b8e3af772e425b0ef50d27bbd/front_end/quick_open/FilteredListWidget.js#L339-L445
 */

function compareIntegers(a: number, b: number): number {
  return b - a;
}

function itemScoreAt(text: string, query: string): number {
  const opcodes = DiffWrapper.charDiff(query.toLowerCase(), text.toLowerCase());
  let score = 0;
  // Score longer sequences higher.
  for (let i = 0; i < opcodes.length; ++i) {
    if (opcodes[i][0] === Operation.Equal) {
      score += opcodes[i][1].length * opcodes[i][1].length;
    }
  }
  console.log(text, score, opcodes);
  return score;
}

export const filterItemsCDTS = <T extends ListItem>(
  items: readonly T[],
  filter: string,
): readonly T[] => {
  if (filter.trim() === '') {
    return items;
  }

  const filterRegex = createFilterRegex(filter);
  const filteredItems: T[] = [];

  const bestScores: number[] = [];
  const bestItems: number[] = [];
  const bestItemsToCollect = 100;
  let minBestScore = 0;
  const overflowItems = [];
  const maxWorkItems = clamp(10, 500, (items.length / 10) | 0);
  let workDone = 0;

  for (let i = 0; i < items.length && workDone < maxWorkItems; ++i) {
    const item = items[i];

    // Filter out non-matching items quickly.
    if (filterRegex && !filterRegex.test(item.label)) {
      continue;
    }

    // Score item.
    const score = itemScoreAt(item.label, filter);
    if (filter) {
      workDone++;
    }

    // Find its index in the scores array (earlier elements have bigger scores).
    if (score > minBestScore || bestScores.length < bestItemsToCollect) {
      const index = upperBound(bestScores, score, compareIntegers);
      bestScores.splice(index, 0, score);
      bestItems.splice(index, 0, i);
      if (bestScores.length > bestItemsToCollect) {
        // Best list is too large -> drop last elements.
        overflowItems.push(peekLast(bestItems));
        bestScores.length = bestItemsToCollect;
        bestItems.length = bestItemsToCollect;
      }
      minBestScore = peekLast(bestScores);
    } else {
      filteredItems.push({
        ...item,
        matches: [], // TODO
      });
    }
  }

  return filteredItems;
};
