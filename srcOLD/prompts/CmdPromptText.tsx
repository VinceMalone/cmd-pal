import * as React from 'react';
import { useCallback, useRef, useState } from 'react';

import { CmdContainer } from '../presentational/CmdContainer';
import { CmdHelpText } from '../presentational/CmdHelpText';
import { CmdInput } from '../presentational/CmdInput';
import { useAutoFocus } from '../util/useAutoFocus';
import { useHotkeys } from '../util/useHotKeys';

export interface CmdPromptTextProps {
  message?: string;
  onCommit(value: string): void;
  onExit(): void;
}

export const CmdPromptText = ({
  message,
  onCommit,
  onExit,
}: CmdPromptTextProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  useHotkeys('escape', onExit);
  useAutoFocus(inputRef, true);

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setValue(evt.target.value);
    },
    [],
  );

  const handleEnter = useCallback(() => onCommit(value), [onCommit, value]);

  return (
    <CmdContainer onEnter={handleEnter} onOutsideClick={onExit}>
      {message && <CmdHelpText description={message} />}
      <CmdInput
        label="TODO"
        onChange={handleChange}
        ref={inputRef}
        value={value}
      />
    </CmdContainer>
  );
};
