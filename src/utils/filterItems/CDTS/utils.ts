const regexSpecialCharacters = '^[]{}()\\.^$*+?|-,';

export function createFilterRegex(query: string): RegExp {
  const toEscape = regexSpecialCharacters;
  let regexString = '';
  for (let i = 0; i < query.length; ++i) {
    let c = query.charAt(i);
    if (toEscape.indexOf(c) !== -1) {
      c = '\\' + c;
    }
    if (i) {
      regexString += '[^\\0' + c + ']*';
    }
    regexString += c;
  }
  return new RegExp(regexString, 'i');
}

export function clamp(num: number, min: number, max: number): number {
  let clampedNumber = num;
  if (num < min) {
    clampedNumber = min;
  } else if (num > max) {
    clampedNumber = max;
  }
  return clampedNumber;
}
