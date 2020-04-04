import * as React from 'react';

import {
  OptionList,
  OptionListItemProps,
  OptionListProps,
} from '../../components/base/OptionList';
import { useTokensContext } from '../../contexts/tokens';

import { useToggleItem } from './useToggleItem';

export interface RenderItemProps extends OptionListItemProps {
  selected: boolean;
}

type PassThroughProps = Pick<OptionListProps, 'as' | 'emptyLabel'>;
export interface MultiChoicePromptListProps extends PassThroughProps {
  children(props: RenderItemProps): React.ReactElement;
}

export const MultiChoicePromptList: React.FC<MultiChoicePromptListProps> = ({
  as,
  children,
  emptyLabel,
}) => {
  const toggleItem = useToggleItem();
  const { state } = useTokensContext();
  const { tokens } = state;

  const selectedSet = React.useMemo(
    () => new Set(tokens.map(token => token.id)),
    [tokens],
  );

  return (
    <OptionList as={as} emptyLabel={emptyLabel} onSelect={toggleItem}>
      {({ focused, item, onSelect }) =>
        children({
          // Don't render item as focused if a token is focused
          focused: state.focusedIndex === -1 && focused,
          item,
          onSelect,
          selected: selectedSet.has(item.id),
        })
      }
    </OptionList>
  );
};
