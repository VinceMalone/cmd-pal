import * as React from 'react';

import {
  ChoiceMenuList,
  ChoiceMenuListProps,
} from '../../components/ChoiceMenuList';
import { toggle, useTokensContext } from '../../contexts/tokens';
import { ChoiceListItem } from '../../types/Choice';

export type MultiChoiceMenuListProps = Omit<ChoiceMenuListProps, 'onSelect'>;

export const MultiChoiceMenuList: React.FC<MultiChoiceMenuListProps> = props => {
  const { dispatch } = useTokensContext();

  const handleSelect = React.useCallback(
    (item: ChoiceListItem) => dispatch(toggle(item)),
    [dispatch],
  );

  return <ChoiceMenuList {...props} onSelect={handleSelect} />;
};
