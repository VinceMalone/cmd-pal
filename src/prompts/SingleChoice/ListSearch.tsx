import * as React from 'react';

import { CmdInput } from '../../components/CmdInput';
import { search, useListContext } from '../../contexts/list';
import { useAutoFocus } from '../../utils/useAutoFocus';

type InputProps = React.RefAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

export interface CmdSearchProps {
  as?: React.ComponentType<InputProps>;
}

export const ListSearch: React.FC<CmdSearchProps> = ({ as }) => {
  const { dispatch, state } = useListContext();

  const inputRef = React.useRef<HTMLInputElement>(null);
  useAutoFocus(inputRef, true);

  const handleChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(search(evt.target.value));
    },
    [dispatch],
  );

  return (
    <CmdInput
      aria-activedescendant={state.activeDescendant}
      aria-autocomplete="list"
      aria-haspopup="true"
      as={as}
      autoCorrect="off"
      autoCapitalize="off"
      label="Type to narrow down results."
      onChange={handleChange}
      placeholder="Type to narrow down results."
      ref={inputRef}
      role="combobox"
      spellCheck={false}
      value={state.searchQuery}
    />
  );
};
