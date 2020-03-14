import * as tb from 'ts-toolbelt';

type Resolve<V, In, Out> = tb.F.Function<[V, In], tb.M.Promisable<Out>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Resolvable<V = any, In = any, Out = any> {
  resolve: Resolve<V, In, Out>;
}
