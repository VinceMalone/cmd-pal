import { ListItem, Match } from '../../types/List';

const compare = (a: string, b: string) =>
  a.toLocaleLowerCase() === b.toLocaleLowerCase();

const groupBySequence = (
  acc: number[][],
  value: number,
  index: number,
  array: number[],
): number[][] => {
  if (index === 0 || value !== array[index - 1] + 1) {
    acc.push([]);
  }
  acc[acc.length - 1].push(value);
  return acc;
};

const toFirstAndLast = (sequence: number[]): Match => ({
  start: sequence[0],
  end: sequence[sequence.length - 1] + 1,
});

export const filterItemsCDT = <T extends ListItem>(
  items: readonly T[],
  filter: string,
): readonly T[] => {
  if (filter.trim() === '') {
    return items;
  }

  const results: T[] = [];

  for (const item of items) {
    const indices: number[] = [];
    const { label } = item;
    let labelIndex = 0;
    let queryIndex = 0;

    while (labelIndex < label.length && queryIndex < filter.length) {
      if (compare(label[labelIndex], filter[queryIndex])) {
        indices.push(labelIndex);
        queryIndex++;
      }

      labelIndex++;
    }

    if (queryIndex === filter.length) {
      results.push({
        ...item,
        matches: indices.reduce(groupBySequence, []).map(toFirstAndLast),
      });
    }
  }

  return results;
};
