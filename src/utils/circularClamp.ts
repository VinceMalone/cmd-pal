export const circularClamp = (n: number, min: number, max: number): number => {
  // Preventing NaN
  if (max === 0) {
    return min;
  }

  const offset = min >= 0 ? 0 : Math.abs(min);

  return offset === 0
    ? n >= min
      ? n % max
      : ((n % max) + max) % max
    : circularClamp(n + offset, min + offset, max + offset) - offset;
};

// const cyclicalClamp = (n: number, min: number, max: number): number =>
//   n < min ? max : n > max || max === -1 ? min : n % (max + 1);
