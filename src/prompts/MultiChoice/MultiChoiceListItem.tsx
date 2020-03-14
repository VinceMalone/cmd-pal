import * as React from 'react';

import { CmdHighlighted } from '../../components/CmdHighlighted';
import { CmdListItem } from '../../components/CmdListItem';
import { VisualCheckbox } from '../../components/VisualCheckbox';
import { useComponents } from '../../contexts/components';
import { useListContext } from '../../contexts/list';
import { useTokensContext } from '../../contexts/tokens';
import { ChoiceListItem } from '../../types/Choice';

const SelectedStatus: React.FC<{ id: string }> = ({ id }) => {
  const listContext = useListContext();
  const tokensContext = useTokensContext();

  const selected = tokensContext.state.tokens.some(token => token.id === id);
  // TODO: quicker lookup?
  // const selected = state.tokens.has(id);

  return (
    <>
      {listContext.state.items.length > 0 && (
        <VisualCheckbox checked={selected} />
      )}
    </>
  );
};

export interface MultiChoiceListItemProps {
  focused: boolean;
  item: ChoiceListItem;
  onSelect(id: string): void;
}

export const MultiChoiceListItem: React.FC<MultiChoiceListItemProps> = ({
  focused,
  item,
  onSelect,
}) => {
  const components = useComponents();
  const tokensContext = useTokensContext();

  return (
    <CmdListItem
      as={components.Option}
      focused={tokensContext.state.focusedIndex === -1 && focused}
      id={item.id}
      label={item.label}
      onSelect={onSelect}
    >
      <SelectedStatus id={item.id} />
      <CmdHighlighted
        as={components.Mark}
        label={item.label}
        matches={item.matches}
      />
    </CmdListItem>
  );
};
