import * as React from 'react';

import {
  OptionList,
  OptionListItemProps,
  OptionListProps,
} from '../../components/base/OptionList';

import { useSingleOptionPromptContext } from './context';

export interface RenderItemProps extends OptionListItemProps {}

type PassThroughProps = Pick<OptionListProps, 'as' | 'emptyLabel'>;
export interface SingleOptionPromptListProps extends PassThroughProps {
  children(props: RenderItemProps): React.ReactElement;
}

export const SingleOptionPromptList: React.FC<SingleOptionPromptListProps> = ({
  as,
  children,
  emptyLabel,
}) => {
  const { submit } = useSingleOptionPromptContext();

  return (
    <OptionList as={as} emptyLabel={emptyLabel} onSelect={submit}>
      {children}
    </OptionList>
  );
};
