import { useResolved } from 'use-resolved';

import { Resolvable } from '../types/Resolvable';

import { call } from './call';

export const useResult = <V, I>(value: Resolvable<V, [I]>, input: I) =>
  useResolved(() => call(value, input), [value, input]);
