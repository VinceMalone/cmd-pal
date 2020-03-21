import * as React from 'react';

import { Confirm, ConfirmProps } from '../../src/prompts/Confirm';
import { MultiChoice, MultiChoiceProps } from '../../src/prompts/MultiChoice';
import {
  SingleChoice,
  SingleChoiceProps,
} from '../../src/prompts/SingleChoice';
import { Text, TextProps } from '../../src/prompts/Text';

export const Prompts = {
  Confirm<In, Out>(props: ConfirmProps<In, Out>) {
    return <Confirm<In, Out> {...props} />;
  },
  MultiChoice<V, In, Out>(props: MultiChoiceProps<V, In, Out>) {
    return <MultiChoice<V, In, Out> {...props} />;
  },
  SingleChoice<V, In, Out>(props: SingleChoiceProps<V, In, Out>) {
    return <SingleChoice<V, In, Out> {...props} />;
  },
  Text<In, Out>(props: TextProps<In, Out>) {
    return <Text<In, Out> {...props} />;
  },
};
