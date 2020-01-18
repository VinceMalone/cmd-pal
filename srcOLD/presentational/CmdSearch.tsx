import * as React from 'react';
import { forwardRef } from 'react';

import { CmdInput, CmdInputProps } from './CmdInput';

export interface CmdSearchProps extends Omit<CmdInputProps, 'label'> {
  activeDescendant: string | undefined;
}

export const CmdSearch = forwardRef<HTMLInputElement, CmdSearchProps>(
  ({ activeDescendant, ...props }, ref) => (
    <CmdInput
      {...props}
      aria-activedescendant={activeDescendant}
      aria-autocomplete="list"
      aria-haspopup="true"
      label="Command Pal. Type to narrow down results."
      placeholder="Type to narrow down results."
      ref={ref}
      role="combobox"
    />
  ),
);

CmdSearch.displayName = 'CmdSearch';
