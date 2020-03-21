import * as React from 'react';

import {
  ChoiceMenuList,
  ChoiceMenuListProps,
  RenderItemProps,
} from '../../components/ChoiceMenuList';
import { useComponents } from '../../contexts/components';
import { toggle, useTokensContext } from '../../contexts/tokens';
import { ChoiceListItem } from '../../types/Choice';

export interface MultiChoicePromptListProps
  extends Omit<ChoiceMenuListProps, 'children' | 'onSelect'> {
  children(props: RenderItemProps & { selected: boolean }): React.ReactElement;
}

export const MultiChoicePromptList: React.FC<MultiChoicePromptListProps> = ({
  as: As,
  children,
  ...props
}) => {
  const { List } = useComponents();
  const { dispatch, state } = useTokensContext();

  const handleSelect = React.useCallback(
    (item: ChoiceListItem) => dispatch(toggle(item)),
    [dispatch],
  );

  const selectedSet = React.useMemo(
    () => new Set(state.tokens.map(token => token.id)),
    [state.tokens],
  );

  return (
    <ChoiceMenuList {...props} as={As ?? List} onSelect={handleSelect}>
      {({ focused, item, onSelect }) =>
        children({
          // Don't render item as focused if a token is focused
          focused: state.focusedIndex === -1 && focused,
          item,
          onSelect,
          selected: selectedSet.has(item.id),
        })
      }
    </ChoiceMenuList>
  );
};
