import { Resolvable } from './Resolvable';

export interface PromptProps<V, In, Out> {
  resolve?: Resolvable<Out, [V, In]>;
}
