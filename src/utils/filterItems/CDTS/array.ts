export function peekLast<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

function defaultComparator(a: any, b: any): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * Return index of the leftmost element that is greater
 * than the specimen object. If there's no such element (i.e. all
 * elements are smaller or equal to the specimen) returns right bound.
 * The function works for sorted array.
 * When specified, |left| (inclusive) and |right| (exclusive) indices
 * define the search window
 */
export function upperBound<T, S>(
  arr: S[],
  object: T,
  comparator: (object: T, element: S) => number = defaultComparator,
  left = 0,
  right = arr.length,
): number {
  while (left < right) {
    const m = (left + right) >> 1;
    if (comparator(object, arr[m]) >= 0) {
      left = m + 1;
    } else {
      right = m;
    }
  }
  return right;
}
