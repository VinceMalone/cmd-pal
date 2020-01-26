import * as tb from 'ts-toolbelt';

export type Functionable<T, A extends unknown[] = []> = T | tb.F.Function<A, T>;
