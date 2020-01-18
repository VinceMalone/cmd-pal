import * as React from 'react';
import { useCallback, useRef } from 'react';

import { Option } from '../../typings/Item';

import { useAutoFocus } from '../util/useAutoFocus';
import { useHotkeys } from '../util/useHotkeys';
import { useList } from '../util/useList';
import { CmdContainer } from '../presentational/CmdContainer';
import { CmdHelpText } from '../presentational/CmdHelpText';
import { CmdList } from '../presentational/CmdList';
import { CmdSearch } from '../presentational/CmdSearch';

export interface CmdPromptSingleChoiceProps {
  choices: Option[];
  message?: string;
  onCommit(value: string): void;
  onExit(): void;
}

export const CmdPromptSingleChoice = ({
  choices,
  message,
  onCommit,
  onExit,
}: CmdPromptSingleChoiceProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys('escape', onExit);
  useAutoFocus(inputRef, true);

  const {
    activeDescendant,
    focusedIndex,
    handleMoveFocus,
    handleSearch,
    items,
    searchQuery,
  } = useList(choices);

  const handleExec = useCallback(
    async index => {
      const choice = choices[index];
      onCommit(choice.value);
    },
    [choices, onCommit],
  );

  const handleArrowDown = useCallback(() => handleMoveFocus(1), [
    handleMoveFocus,
  ]);

  const handleArrowUp = useCallback(() => handleMoveFocus(-1), [
    handleMoveFocus,
  ]);

  const handleEnter = useCallback(() => handleExec(focusedIndex), [
    focusedIndex,
    handleExec,
  ]);

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      handleSearch(evt.target.value);
    },
    [handleSearch],
  );

  return (
    <CmdContainer
      onArrowDown={handleArrowDown}
      onArrowUp={handleArrowUp}
      onEnter={handleEnter}
      onOutsideClick={onExit}
    >
      {message && <CmdHelpText description={message} />}
      <CmdSearch
        activeDescendant={activeDescendant}
        onChange={handleChange}
        ref={inputRef}
        value={searchQuery}
      />
      <CmdList
        activeDescendant={activeDescendant}
        commands={items}
        focusedIndex={focusedIndex}
        onSelect={handleExec}
      />
    </CmdContainer>
  );
};
