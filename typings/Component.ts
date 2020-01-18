import * as tb from 'ts-toolbelt';

type Resolve<V, In, Out> = tb.F.Function<[V, In], tb.M.Promisable<Out>>;

export type Resolvable<V = any, In = any, Out = any> = React.ReactElement<{
  resolve: Resolve<V, In, Out>;
}>;

type ResolveTypes<T extends Resolvable> = T extends Resolvable<
  infer V,
  infer In,
  infer Out
>
  ? { value: V; in: In; out: Out }
  : never;

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
        ? { 1: any; 0: X }[tb.B.Or<
            tb.A.Extends<unknown, X>,
            tb.A.Extends<unknown[], X>
          >]
        : never,
      ResolveTypes<Resolvables[tb.I.Pos<tb.I.IterationOf<K & string>>]>['out']
    >;

export type PromptPipe<Resolvables extends tb.L.List<Resolvable>> = {
  [K in keyof Resolvables]: ResolvablePipeFn<Resolvables, K>;
};
