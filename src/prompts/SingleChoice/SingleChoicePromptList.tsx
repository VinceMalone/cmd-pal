import * as React from 'react';

import {
  OptionList,
  OptionListItemProps,
  OptionListProps,
} from '../../components/base/OptionList';

import { useSingleChoicePromptContext } from './context';

export interface RenderItemProps extends OptionListItemProps {}

type PassThroughProps = Pick<OptionListProps, 'as' | 'emptyLabel'>;
export interface SingleChoicePromptListProps extends PassThroughProps {
  children(props: RenderItemProps): React.ReactElement;
}

export const SingleChoicePromptList: React.FC<SingleChoicePromptListProps> = ({
  as,
  children,
  emptyLabel,
}) => {
  const { submit } = useSingleChoicePromptContext();

  return (
    <OptionList as={as} emptyLabel={emptyLabel} onSelect={submit}>
      {children}
    </OptionList>
  );
};
