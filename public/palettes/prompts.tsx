import * as React from 'react';

import { Confirm, ConfirmProps } from '../../src/prompts/Confirm';
import { List, ListProps } from '../../src/prompts/List';
import { MultiOption, MultiOptionProps } from '../../src/prompts/MultiOption';
import {
  SingleOption,
  SingleOptionProps,
} from '../../src/prompts/SingleOption';
import { Text, TextProps } from '../../src/prompts/Text';

export const Prompts = {
  Confirm<In, Out>(props: ConfirmProps<In, Out>) {
    return <Confirm<In, Out> {...props} />;
  },
  List<In, Out>(props: ListProps<In, Out>) {
    return <List<In, Out> {...props} />;
  },
  MultiOption<V, In, Out>(props: MultiOptionProps<V, In, Out>) {
    return <MultiOption<V, In, Out> {...props} />;
  },
  SingleOption<V, In, Out>(props: SingleOptionProps<V, In, Out>) {
    return <SingleOption<V, In, Out> {...props} />;
  },
  Text<In, Out>(props: TextProps<In, Out>) {
    return <Text<In, Out> {...props} />;
  },
};
