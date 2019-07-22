import * as React from 'react';
import { forwardRef, useCallback } from 'react';
import styled from 'styled-components';

import { useComponents } from '../util/components';

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
`;

export interface CmdSearchProps {
  activeDescendant: string | undefined;
  onSearch: (query: string) => void;
  query: string;
}

export const CmdSearch = forwardRef<HTMLInputElement, CmdSearchProps>(
  ({ activeDescendant, onSearch, query, ...props }, ref) => {
    const components = useComponents();

    const handleChange = useCallback(
      (evt: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(evt.target.value);
      },
      [onSearch],
    );

    return (
      <Input
        {...props}
        aria-activedescendant={activeDescendant}
        aria-autocomplete="list"
        aria-haspopup="true"
        aria-label="Command Pal. Type to narrow down results."
        as={components.Input}
        autoCorrect="off"
        autoCapitalize="off"
        onChange={handleChange}
        placeholder="Type to narrow down results."
        ref={ref}
        role="combobox"
        spellCheck={false}
        type="text"
        value={query}
      />
    );
  },
);

CmdSearch.displayName = 'CmdSearch';
