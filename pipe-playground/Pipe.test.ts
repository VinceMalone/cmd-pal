import * as tb from 'ts-toolbelt';

import { Pipe } from './Pipe';
import { PromptMultiChoice, PromptText } from './Prompt';
import { Resolvable } from './Resolve';

const { check, checks } = tb.Test;

checks([
  check<
    Pipe<[PromptText<'start', 'end'>]>,
    [PromptText<'start', 'end'>],
    tb.Test.Pass
  >(),
  check<
    Pipe<[PromptMultiChoice<'start', 'end'>]>,
    [PromptMultiChoice<'start', 'end'>],
    tb.Test.Pass
  >(),
  check<
    Pipe<[PromptText<'start', 'end'>]>,
    [Resolvable<string, 'start', 'end'>],
    tb.Test.Fail
  >(),
  check<
    Pipe<[PromptMultiChoice<'start', 'end'>]>,
    [Resolvable<string[], 'start', 'end'>],
    tb.Test.Fail
  >(),
  check<
    Pipe<[PromptText<'start', 'a'>, PromptText<'a', 'end'>]>,
    [PromptText<'start', 'a'>, Resolvable<string, 'a', 'end'>],
    tb.Test.Pass
  >(),
  check<
    Pipe<[PromptText<'start', 'a'>, PromptText<'b', 'end'>]>,
    [PromptText<'start', 'a'>, Resolvable<string, 'a', 'end'>],
    tb.Test.Pass
  >(),
  check<
    Pipe<[PromptText<'start', 'a'>, PromptMultiChoice<'a', 'end'>]>,
    [PromptText<'start', 'a'>, Resolvable<string[], 'a', 'end'>],
    tb.Test.Pass
  >(),
  check<
    Pipe<[PromptText<'start', 'a'>, PromptMultiChoice<'b', 'end'>]>,
    [PromptText<'start', 'a'>, Resolvable<string[], 'a', 'end'>],
    tb.Test.Pass
  >(),
  check<
    Pipe<
      [PromptText<'start', 'a'>, PromptText<'a', 'b'>, PromptText<'b', 'end'>]
    >,
    [
      PromptText<'start', 'a'>,
      Resolvable<string, 'a', 'b'>,
      Resolvable<string, 'b', 'end'>,
    ],
    tb.Test.Pass
  >(),
  check<
    Pipe<
      [PromptText<'start', 'a'>, PromptText<'a', 'b'>, PromptText<'c', 'end'>]
    >,
    [
      PromptText<'start', 'a'>,
      Resolvable<string, 'a', 'b'>,
      Resolvable<string, 'b', 'end'>,
    ],
    tb.Test.Pass
  >(),
  check<
    Pipe<
      [
        PromptText<'start', 'a'>,
        PromptMultiChoice<'a', 'b'>,
        PromptText<'b', 'end'>,
      ]
    >,
    [
      PromptText<'start', 'a'>,
      Resolvable<string[], 'a', 'b'>,
      Resolvable<string, 'b', 'end'>,
    ],
    tb.Test.Pass
  >(),
  check<
    Pipe<
      [
        PromptText<'start', 'a'>,
        PromptMultiChoice<'a', 'b'>,
        PromptText<'c', 'end'>,
      ]
    >,
    [
      PromptText<'start', 'a'>,
      Resolvable<string[], 'a', 'b'>,
      Resolvable<string, 'b', 'end'>,
    ],
    tb.Test.Pass
  >(),
]);
