import * as tb from 'ts-toolbelt';

import { Pipe } from './Pipe';
import { PromptMultiChoice, PromptSingleChoice, PromptText } from './Prompt';
import { Resolvable } from './Resolve';

/**
 * this was just a playground (for dev/test)
 */

declare function createPipe<T extends tb.L.List<Resolvable>>(
  ..._: Pipe<T>
): T & { $$type: 'pipe' };

declare function createPromptMultiChoice<T, R>(): PromptMultiChoice<T, R>;
declare function createPromptSingleChoice<T, R>(): PromptSingleChoice<T, R>;
declare function createPromptText<T, R>(): PromptText<T, R>;

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
