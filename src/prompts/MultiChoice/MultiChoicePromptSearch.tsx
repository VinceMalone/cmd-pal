import * as React from 'react';

import { InputToken, InputTokenProps } from '../../components/InputToken';
import { useComponents } from '../../contexts/components';
import { moveFocus, search, useListContext } from '../../contexts/list';
import { toggle, useTokensContext } from '../../contexts/tokens';
import { ChoiceListItem } from '../../types/Choice';

import { useMultiChoicePromptContext } from './context';

export interface MultiChoicePromptSearchProps {
  as?: InputTokenProps<ChoiceListItem>['as'];
}

export const MultiChoicePromptSearch: React.FC<MultiChoicePromptSearchProps> = ({
  as: As,
}) => {
  const { TokenInput } = useComponents();
  const listContext = useListContext<ChoiceListItem>();
  const tokensContext = useTokensContext();
  const { submit } = useMultiChoicePromptContext();

  const handleArrowY = (
    evt: React.KeyboardEvent<HTMLElement>,
    delta: number,
  ) => {
    evt.preventDefault();
    if (tokensContext.state.focusedIndex === -1) {
      listContext.dispatch(moveFocus(delta));
    }

    // TODO: consider `else { unfocus tokens and move list focusedIndex }`
    // ... (similar to how onChange works when a token is focused)
  };

  const handleSelect = () => {
    const focusedItem = listContext.state.items[listContext.state.focusedIndex];
    if (focusedItem !== undefined) {
      tokensContext.dispatch(toggle(focusedItem));
    }
  };

  return (
    <InputToken<ChoiceListItem>
      // TODO: aria-X (left over from old `MultiChoiceSearch`)
      aria-autocomplete="list" // TODO
      aria-haspopup="true" // TODO
      aria-label="Type to narrow down results." // TODO
      as={As ?? TokenInput}
      onArrowDown={evt => handleArrowY(evt, 1)}
      onArrowUp={evt => handleArrowY(evt, -1)}
      onChange={value => listContext.dispatch(search(value))}
      onSelect={handleSelect}
      onSubmit={submit}
      value={listContext.state.searchQuery}
    />
  );
};
