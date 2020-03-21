import * as React from 'react';

import { CmdInput } from '../../components/CmdInput';
import { useComponents } from '../../contexts/components';
import { moveFocus, search, useListContext } from '../../contexts/list';
import { ChoiceListItem } from '../../types/Choice';
import { useAutoFocus } from '../../utils/useAutoFocus';

import { useSingleChoicePromptContext } from './context';

type InputProps = React.RefAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

export interface SingleChoicePromptSearchProps {
  as?: React.ComponentType<InputProps>;
}

export const SingleChoicePromptSearch: React.FC<SingleChoicePromptSearchProps> = ({
  as: As,
}) => {
  const { Input } = useComponents();
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
    dispatch(moveFocus(delta));
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
    <CmdInput
      aria-activedescendant={state.activeDescendant}
      aria-autocomplete="list"
      aria-haspopup="true"
      as={As ?? Input}
      autoCorrect="off"
      autoCapitalize="off"
      label="Type to narrow down results."
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
