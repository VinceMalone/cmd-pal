import { CharCode } from './charCode';

function isLowerAsciiLetter(code: number): boolean {
  return code >= CharCode.a && code <= CharCode.z;
}

function isUpperAsciiLetter(code: number): boolean {
  return code >= CharCode.A && code <= CharCode.Z;
}

function isAsciiLetter(code: number): boolean {
  return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
}

function doEqualsIgnoreCase(a: string, b: string, stopAt = a.length): boolean {
  for (let i = 0; i < stopAt; i++) {
    const codeA = a.charCodeAt(i);
    const codeB = b.charCodeAt(i);

    if (codeA === codeB) {
      continue;
    }

    // a-z A-Z
    if (isAsciiLetter(codeA) && isAsciiLetter(codeB)) {
      const diff = Math.abs(codeA - codeB);
      if (diff !== 0 && diff !== 32) {
        return false;
      }
    }

    // Any other charcode
    else {
      if (
        String.fromCharCode(codeA).toLowerCase() !==
        String.fromCharCode(codeB).toLowerCase()
      ) {
        return false;
      }
    }
  }

  return true;
}

export function startsWithIgnoreCase(str: string, candidate: string): boolean {
  const candidateLength = candidate.length;
  if (candidate.length > str.length) {
    return false;
  }

  return doEqualsIgnoreCase(str, candidate, candidateLength);
}
