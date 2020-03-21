import * as React from 'react';

import {
  ChoiceMenuList,
  ChoiceMenuListProps,
} from '../../components/ChoiceMenuList';
import { useComponents } from '../../contexts/components';

import { useSingleChoicePromptContext } from './context';

export interface SingleChoicePromptListProps {
  as?: ChoiceMenuListProps['as'];
  children: ChoiceMenuListProps['children'];
}

export const SingleChoicePromptList: React.FC<SingleChoicePromptListProps> = ({
  as: As,
  children,
}) => {
  const { List } = useComponents();
  const { submit } = useSingleChoicePromptContext();

  return (
    <ChoiceMenuList as={As ?? List} onSelect={submit}>
      {children}
    </ChoiceMenuList>
  );
};
