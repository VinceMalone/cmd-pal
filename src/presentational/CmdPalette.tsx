import * as React from 'react';
import { useCallback, useRef } from 'react';

import { CommandItem } from '../../typings/Command';

import useAutoFocus from '../util/useAutoFocus';
import useHotkeys from '../util/useHotkeys';
import { CmdContainer } from './CmdContainer';
import { CmdList } from './CmdList';
import { CmdProgress } from './CmdProgress';
import { CmdSearch } from './CmdSearch';

export interface CmdPaletteProps {
  activeDescendant: string | undefined;
  commands: CommandItem[];
  focusedIndex: number;
  onClose: () => void;
  onExec: (cmd: CommandItem) => void;
  onMoveFocus: (delta: number) => void;
  onOpen: () => void;
  onSearch: (query: string) => void;
  opened: boolean;
  progress: boolean;
  query: string;
  summary: string | undefined;
}

export const CmdPalette = ({
  activeDescendant,
  commands,
  focusedIndex,
  onClose,
  onExec,
  onMoveFocus,
  onOpen,
  onSearch,
  opened,
  progress,
  query,
  summary,
}: CmdPaletteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys('option+shift+p', onOpen);
  useHotkeys('escape', onClose);
  useAutoFocus(inputRef, opened);

  const handleExec = useCallback(
    async index => {
      const cmd = commands[index];
      if (cmd != null) {
        onExec(cmd);
      }
    },
    [commands, onExec],
  );

  const handleArrowDown = useCallback(() => onMoveFocus(1), [onMoveFocus]);
  const handleArrowUp = useCallback(() => onMoveFocus(-1), [onMoveFocus]);
  const handleEnter = useCallback(() => handleExec(focusedIndex), [handleExec, focusedIndex]);

  return (
    <>
      {opened && (
        <CmdContainer
          onArrowDown={handleArrowDown}
          onArrowUp={handleArrowUp}
          onEnter={handleEnter}
          onOutsideClick={onClose}
        >
          <CmdSearch
            activeDescendant={activeDescendant}
            onSearch={onSearch}
            query={query}
            ref={inputRef}
          />
          <CmdList
            activeDescendant={activeDescendant}
            commands={commands}
            focusedIndex={focusedIndex}
            onSelect={handleExec}
          />
        </CmdContainer>
      )}
      {progress && <CmdProgress summary={summary} />}
    </>
  );
};
