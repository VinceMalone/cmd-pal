import { Match } from '../../../types/List';

import { CharCode } from './charCode';
import { startsWithIgnoreCase } from './strings';

interface Filter {
  // Returns null if word doesn't match.
  (word: string, wordToMatchAgainst: string): Match[] | null;
}

/**
 * A filter which combines the provided set
 * of filters with an or. The *first* filters that
 * matches defined the return value of the returned
 * filter.
 */
export function or(...filter: Filter[]): Filter {
  return function(word: string, wordToMatchAgainst: string): Match[] | null {
    for (let i = 0, len = filter.length; i < len; i++) {
      const match = filter[i](word, wordToMatchAgainst);
      if (match) {
        return match;
      }
    }
    return null;
  };
}

// Prefix

export function matchesPrefix(
  word: string,
  wordToMatchAgainst: string,
): Match[] | null {
  if (!wordToMatchAgainst || wordToMatchAgainst.length < word.length) {
    return null;
  }

  const matches = startsWithIgnoreCase(wordToMatchAgainst, word);

  if (!matches) {
    return null;
  }

  return word.length > 0 ? [{ start: 0, end: word.length }] : [];
}

// Contiguous Substring

export function matchesContiguousSubString(
  word: string,
  wordToMatchAgainst: string,
): Match[] | null {
  const index = wordToMatchAgainst.toLowerCase().indexOf(word.toLowerCase());
  if (index === -1) {
    return null;
  }

  return [
    {
      start: index,
      end: index + word.length,
    },
  ];
}

// CamelCase

function isWhitespace(code: number): boolean {
  return (
    code === CharCode.Space ||
    code === CharCode.Tab ||
    code === CharCode.LineFeed ||
    code === CharCode.CarriageReturn
  );
}

const wordSeparators = new Set<number>();
'`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?'
  .split('')
  .forEach(s => wordSeparators.add(s.charCodeAt(0)));

function isWordSeparator(code: number): boolean {
  return isWhitespace(code) || wordSeparators.has(code);
}

function charactersMatch(codeA: number, codeB: number): boolean {
  return codeA === codeB || (isWordSeparator(codeA) && isWordSeparator(codeB));
}

function join(head: Match, tail: Match[]): Match[] {
  if (tail.length === 0) {
    tail = [head];
  } else if (head.end === tail[0].start) {
    tail[0].start = head.start;
  } else {
    tail.unshift(head);
  }
  return tail;
}

function nextWord(word: string, start: number): number {
  for (let i = start; i < word.length; i++) {
    if (
      isWordSeparator(word.charCodeAt(i)) ||
      (i > 0 && isWordSeparator(word.charCodeAt(i - 1)))
    ) {
      return i;
    }
  }
  return word.length;
}

function _matchesWords(
  word: string,
  target: string,
  i: number,
  j: number,
  contiguous: boolean,
): Match[] | null {
  if (i === word.length) {
    return [];
  } else if (j === target.length) {
    return null;
  } else if (!charactersMatch(word.charCodeAt(i), target.charCodeAt(j))) {
    return null;
  } else {
    let result: Match[] | null = null;
    let nextWordIndex = j + 1;
    result = _matchesWords(word, target, i + 1, j + 1, contiguous);
    if (!contiguous) {
      while (
        !result &&
        (nextWordIndex = nextWord(target, nextWordIndex)) < target.length
      ) {
        result = _matchesWords(word, target, i + 1, nextWordIndex, contiguous);
        nextWordIndex++;
      }
    }
    return result === null ? null : join({ start: j, end: j + 1 }, result);
  }
}

// Matches beginning of words supporting non-ASCII languages
// If `contiguous` is true then matches word with beginnings of the words in the target. E.g. "pul" will match "Git: Pull"
// Otherwise also matches sub string of the word with beginnings of the words in the target. E.g. "gp" or "g p" will match "Git: Pull"
// Useful in cases where the target is words (e.g. command labels)

export function matchesWords(
  word: string,
  target: string,
  contiguous = false,
): Match[] | null {
  if (!target || target.length === 0) {
    return null;
  }

  let result: Match[] | null = null;
  let i = 0;

  word = word.toLowerCase();
  target = target.toLowerCase();
  while (
    i < target.length &&
    (result = _matchesWords(word, target, 0, i, contiguous)) === null
  ) {
    i = nextWord(target, i + 1);
  }

  return result;
}
