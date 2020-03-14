import * as tb from 'ts-toolbelt';

import { Functionable } from './Functionable';

// TODO: which comment best illustrates the type?

//         T  | A →         T
// Promise<T> | A → Promise<T>

// T | Promise<T> | A → T | A → Promise<T>

export type Resolvable<T, A extends unknown[] = []> = Functionable<
  tb.M.Promisable<T>,
  A
>;
