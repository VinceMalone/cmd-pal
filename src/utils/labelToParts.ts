import { Part } from '../../typings/List';

const createPart = (value: string, isMatch: boolean, id: number): Part => ({
  id: id.toString(),
  isMatch,
  value,
});

export const labelToParts = (
  label: string,
  matches: [number, number][],
): Part[] => {
  const parts: Part[] = [];
  let id = 0;
  let lastIndex = 0;

  matches.forEach(([start, end]) => {
    if (start > lastIndex) {
      parts.push(createPart(label.substring(lastIndex, start), false, id++));
    }

    end += 1;
    parts.push(createPart(label.substring(start, end), true, id++));
    lastIndex = end;
  });

  if (lastIndex < label.length) {
    parts.push(createPart(label.substring(lastIndex), false, id++));
  }

  return parts;
};
