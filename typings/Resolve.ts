import * as tb from 'ts-toolbelt';

type Resolve<V, In, Out> = tb.F.Function<[V, In], tb.M.Promisable<Out>>;

export interface Resolvable<V = any, In = any, Out = any> {
  resolve: Resolve<V, In, Out>;
}
