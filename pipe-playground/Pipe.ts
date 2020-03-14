import * as tb from 'ts-toolbelt';

import { Resolvable } from './Resolve';

type ResolveTypes<T extends Resolvable> = T extends Resolvable<
  infer V,
  infer In,
  infer Out
>
  ? { value: V; in: In; out: Out }
  : never;

// Alternative value for `K extends '0'`
// Resolvable<
//   ResolveTypes<Resolvables[tb.I.Pos<tb.I.IterationOf<K & string>>]>['value'],
//   ResolveTypes<Resolvables[tb.I.Pos<tb.I.IterationOf<K & string>>]>['in'],
//   ResolveTypes<Resolvables[tb.I.Pos<tb.I.IterationOf<K & string>>]>['out']
// >;

type ResolvablePipeFn<
  Resolvables extends tb.L.List<Resolvable>,
  K extends keyof Resolvables
> = K extends '0'
  ? Resolvables[K]
  : Resolvable<
      ResolveTypes<
        Resolvables[tb.I.Pos<tb.I.IterationOf<K & string>>]
      >['value'],
      ResolveTypes<
        Resolvables[tb.I.Pos<tb.I.Prev<tb.I.IterationOf<K & string>>>]
      >['out'] extends infer X
        ? {
            1: any; // eslint-disable-line @typescript-eslint/no-explicit-any
            0: X;
          }[tb.B.Or<tb.A.Extends<unknown, X>, tb.A.Extends<unknown[], X>>]
        : never,
      ResolveTypes<Resolvables[tb.I.Pos<tb.I.IterationOf<K & string>>]>['out']
    >;

export type Pipe<Resolvables extends tb.L.List<Resolvable>> = {
  [K in keyof Resolvables]: ResolvablePipeFn<Resolvables, K>;
};
