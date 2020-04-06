import * as React from 'react';

import {
  TextboxToken,
  TextboxTokenProps,
} from '../../components/base/TextboxToken';
import { moveFocus, search, useListContext } from '../../contexts/list';
import { unfocus, useTokensContext } from '../../contexts/tokens';
import { OptionListItem } from '../../types/Option';

import { useMultiOptionPromptContext } from './context';
import { useToggleItem } from './useToggleItem';

export interface MultiOptionPromptFilterProps
  extends Pick<TextboxTokenProps, 'as'> {}

export const MultiOptionPromptFilter: React.FC<MultiOptionPromptFilterProps> = ({
  as,
}) => {
  const listContext = useListContext<OptionListItem>();
  const tokensContext = useTokensContext();
  const { submit } = useMultiOptionPromptContext();
  const toggleItem = useToggleItem();

  const handleArrowY = (
    evt: React.KeyboardEvent<HTMLElement>,
    delta: number,
  ) => {
    evt.preventDefault();
    if (tokensContext.state.focusedIndex > -1) {
      tokensContext.dispatch(unfocus());
    }

    if (evt.metaKey) {
      const index =
        evt.key === 'ArrowUp' ? 0 : listContext.state.items.length - 1;
      listContext.dispatch(moveFocus({ index }));
    } else {
      // TODO: experiment?
      // Should the focus always move or only when `tokensContext.state.focusedIndex === -1`?
      listContext.dispatch(moveFocus({ delta }));
    }
  };

  const handlePageDown = () => {
    // let index = Math.floor((scrollOffset + listHeight * 1) / itemHeight) - 1;
    // if (index === listContext.state.focusedIndex)
    //   index = Math.floor((scrollOffset + listHeight * 2) / itemHeight) - 2;
  };

  const handlePageUp = () => {
    // let index = Math.ceil((scrollOffset - listHeight * 0) / itemHeight) + 0;
    // if (index === listContext.state.focusedIndex)
    //   index = Math.ceil((scrollOffset - listHeight * 1) / itemHeight) + 1;
  };

  const handlePageY = (direction: 1 | -1) => {
    const { itemHeight, listHeight, scrollOffset } = listContext.ref.current;

    const calcIndex = (coefficient: number) => {
      const listOffset = listHeight * direction;
      const scrollTop = scrollOffset + listOffset * coefficient;
      const indexOffset = coefficient * direction * -1;
      const index = Math.round(scrollTop / itemHeight) + indexOffset;

      const lastIndex = listContext.state.items.length - 1;
      return Math.max(0, Math.min(index, lastIndex));
    };

    const coefficient = direction === 1 ? 1 : 0;
    let index = calcIndex(coefficient);
    if (index === listContext.state.focusedIndex) {
      index = calcIndex(coefficient + 1);
    }

    listContext.dispatch(moveFocus({ index }));
  };

  const handleSelect = () => {
    const { focusedIndex, items } = listContext.state;
    const focusedItem = items[focusedIndex];
    if (focusedItem !== undefined) {
      toggleItem(focusedItem);
    }
  };

  return (
    <TextboxToken
      // TODO: aria-X (left over from old `MultiOptionSearch`)
      aria-autocomplete="list" // TODO
      aria-haspopup="true" // TODO
      aria-label="Type to narrow down results." // TODO
      as={as}
      onArrowDown={evt => handleArrowY(evt, 1)}
      onArrowUp={evt => handleArrowY(evt, -1)}
      onChange={value => listContext.dispatch(search(value))}
      onPageDown={() => handlePageY(1)}
      onPageUp={() => handlePageY(-1)}
      onSelect={handleSelect}
      // onSubmit={submit} // TODO: is the below ok?
      onSubmit={selected => submit(selected as OptionListItem[])}
      value={listContext.state.searchQuery}
    />
  );
};
