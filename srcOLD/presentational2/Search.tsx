import * as React from 'react';
import styled from 'styled-components';

import { search, useListContext } from '../list';
import { usePromptContext } from '../prompt';
import { useAutoFocus } from '../util/useAutoFocus';

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
`;

type InputProps = React.RefAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

export interface SearchProps {
  as?: React.ComponentType<InputProps>;
}

export const Search: React.FC<SearchProps> = ({ as }) => {
  const { dispatch, state } = useListContext();
  const prompt = usePromptContext();

  const inputRef = React.useRef<HTMLInputElement>(null);
  useAutoFocus(inputRef, prompt.state.isOpen);

  const handleChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(search(evt.target.value));
    },
    [dispatch],
  );

  return (
    <Input
      aria-activedescendant={state.activeDescendant}
      aria-autocomplete="list"
      aria-label="Command Pal. Type to narrow down results."
      aria-haspopup="true"
      as={as}
      autoCorrect="off"
      autoCapitalize="off"
      onChange={handleChange}
      placeholder="Type to narrow down results."
      ref={inputRef}
      role="combobox"
      spellCheck={false}
      type="text"
      value={state.searchQuery}
    />
  );
};
