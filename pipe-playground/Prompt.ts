import * as tb from 'ts-toolbelt';

import { Resolvable } from './Resolve';

interface Choice {
  label: string;
  value: string;
}

type Choices<T> =
  | readonly Choice[]
  | tb.F.Function<[T], tb.M.Promisable<readonly Choice[]>>;

export interface PromptMultiChoice<In, Out>
  extends Resolvable<string[], In, Out> {
  choices: Choices<In>;
  type: 'multi-choice';
}

export interface PromptSingleChoice<In, Out>
  extends Resolvable<string, In, Out> {
  choices: Choices<In>;
  type: 'single-choice';
}

export interface PromptText<In, Out> extends Resolvable<string, In, Out> {
  type: 'text';
}
