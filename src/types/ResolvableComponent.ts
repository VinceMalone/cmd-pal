import * as tb from 'ts-toolbelt';

import { Resolvable } from './Resolvable';

export type ResolvableComponent<
  V = unknown,
  In = unknown,
  Out = unknown
> = React.ReactElement<{
  resolve: Resolvable<Out, [V, In]>;
}>;

// TODO: should the following be in it's own file?

type ResolveTypes<
  T extends ResolvableComponent
> = T extends ResolvableComponent<infer V, infer In, infer Out>
  ? { value: V; in: In; out: Out }
  : never;

type ResolvablePipeFn<
  Resolvables extends tb.L.List<ResolvableComponent>,
  K extends keyof Resolvables
> = K extends '0'
  ? Resolvables[K]
  : ResolvableComponent<
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

export type PromptPipe<Resolvables extends tb.L.List<ResolvableComponent>> = {
  [K in keyof Resolvables]: ResolvablePipeFn<Resolvables, K>;
};
