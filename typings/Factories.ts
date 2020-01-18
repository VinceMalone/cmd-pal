import * as tb from 'ts-toolbelt';

import { Pipe } from './Pipe';
import {
  Choice,
  PromptMultiChoice,
  PromptSingleChoice,
  PromptText,
} from './Prompt';
import { Resolvable } from './Resolve';

// export const createChoice = (label: string, value: string): Choice => ({
//   label,
//   value,
// });

// export const createPrompt = {
//   multiChoice: <In, Out>(
//     props: Omit<PromptMultiChoice<In, Out>, 'type'>,
//   ): PromptMultiChoice<In, Out> => ({
//     ...props,
//     type: 'multi-choice',
//   }),
//   singleChoice: <In, Out>(
//     props: Omit<PromptSingleChoice<In, Out>, 'type'>,
//   ): PromptSingleChoice<In, Out> => ({
//     ...props,
//     type: 'single-choice',
//   }),
//   text: <In, Out>(
//     props: Omit<PromptText<In, Out>, 'type'>,
//   ): PromptText<In, Out> => ({
//     ...props,
//     type: 'text',
//   }),
// };

declare function createPipe<T extends tb.L.List<Resolvable>>(
  ..._: Pipe<T>
): T & { $$type: 'pipe' };

declare function createChoice(): Choice;

declare function createPromptMultiChoice<T, R>(): PromptMultiChoice<T, R>;
declare function createPromptSingleChoice<T, R>(): PromptSingleChoice<T, R>;
declare function createPromptText<T, R>(): PromptText<T, R>;

// export declare const createPrompt = {
//   text<T, R>(): PromptText<T, R>;,
// };

createPipe(createPromptText<'start', 'end'>());

createPipe(createPromptText<'start', 'a'>(), createPromptText<'a', 'end'>());

// createPipe(createPromptText<'start', 'a'>(), createPromptText<'b', 'end'>());

createPipe(
  createPromptText<'start', 'a'>(),
  createPromptText<'a', 'b'>(),
  createPromptText<'b', 'end'>(),
);

// createPipe(
//   createPromptText<'start', 'a'>(),
//   createPromptText<'a', 'b'>(),
//   createPromptText<'c', 'end'>(),
// );

createPipe(
  createPromptText<'start', 'a'>(),
  createPromptMultiChoice<'a', 'end'>(),
);

// createPipe(
//   createPromptText<'start', 'a'>(),
//   createPromptMultiChoice<'b', 'end'>(),
// );

createPipe(
  createPromptText<'start', 'a'>(),
  createPromptMultiChoice<'a', 'b'>(),
  createPromptText<'b', 'end'>(),
);

// createPipe(
//   createPromptText<'start', 'a'>(),
//   createPromptMultiChoice<'a', 'b'>(),
//   createPromptText<'c', 'end'>(),
// );
