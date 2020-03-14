import { useResolved } from 'use-resolved';

import { Resolvable } from '../types/Resolvable';

import { call } from './call';

// TODO: this doesn't work when given the following: `() => { throw ... }`

export const useResult = <V, I>(value: Resolvable<V, [I]>, input: I) =>
  useResolved(() => call(value, input), [value, input]);
