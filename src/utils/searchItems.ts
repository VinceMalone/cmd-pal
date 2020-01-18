import { ListItem } from '../../typings/List';

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

const toFirstAndLast = (sequence: number[]): [number, number] => [
  sequence[0],
  sequence[sequence.length - 1],
];

export const searchItems = <T extends ListItem>(
  items: T[],
  query: string,
): T[] => {
  if (query.trim() === '') {
    return items;
  }

  // !important: keep this efficient

  const results: T[] = [];

  items.forEach(item => {
    const indices: number[] = [];
    const { label } = item;
    let labelIndex = 0;
    let queryIndex = 0;

    while (labelIndex < label.length && queryIndex < query.length) {
      if (compare(label[labelIndex], query[queryIndex])) {
        indices.push(labelIndex);
        queryIndex++;
      }

      labelIndex++;
    }

    if (queryIndex === query.length) {
      results.push({
        ...item,
        matches: indices.reduce(groupBySequence, []).map(toFirstAndLast),
      });
    }
  });

  return results;
};
