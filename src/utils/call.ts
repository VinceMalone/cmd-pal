import { Functionable } from '../../typings/Functionable';

export const call = <T, A extends unknown[]>(
  input: Functionable<T, A>,
  ...args: A
) =>
  typeof input === 'function' ? (input as (...args: A) => T)(...args) : input;
