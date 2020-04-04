import * as React from 'react';

import { Textbox, TextboxProps } from '../../components/base/Textbox';
import { moveFocus, search, useListContext } from '../../contexts/list';
import { ChoiceListItem } from '../../types/Choice';
import { useAutoFocus } from '../../utils/useAutoFocus';

import { useSingleChoicePromptContext } from './context';

// TODO: replace "search" with "filter"

export interface SingleChoicePromptSearchProps
  extends Pick<TextboxProps, 'as'> {}

export const SingleChoicePromptSearch: React.FC<SingleChoicePromptSearchProps> = ({
  as,
}) => {
  const { submit } = useSingleChoicePromptContext();
  const { dispatch, state } = useListContext<ChoiceListItem>();
  const { focusedIndex, items } = state;

  const inputRef = React.useRef<HTMLInputElement>(null);
  useAutoFocus(inputRef, true);

  const handleArrowX = (
    evt: React.KeyboardEvent<HTMLElement>,
    delta: number,
  ) => {
    evt.preventDefault();
    dispatch(moveFocus({ delta }));
  };

  const handleEnter = () => {
    const item = items[focusedIndex];
    if (item !== undefined) {
      submit(item);
    }
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
    switch (evt.key) {
      case 'ArrowDown':
        return handleArrowX(evt, 1);
      case 'ArrowUp':
        return handleArrowX(evt, -1);
      case 'Enter':
        return handleEnter();
      case 'Tab':
        evt.preventDefault();
        break;
    }
  };

  return (
    <Textbox
      aria-label="Type to narrow down results."
      aria-activedescendant={state.activeDescendant}
      aria-autocomplete="list"
      aria-haspopup="true"
      as={as}
      autoCorrect="off"
      autoCapitalize="off"
      onChange={evt => dispatch(search(evt.target.value))}
      onKeyDown={handleKeyDown}
      placeholder="Type to narrow down results."
      ref={inputRef}
      role="combobox"
      spellCheck={false}
      value={state.searchQuery}
    />
  );
};
