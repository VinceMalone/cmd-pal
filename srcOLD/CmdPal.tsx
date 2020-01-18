import * as React from 'react';
import { useCallback, useReducer, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { Command, CommandItem, Prompt } from '../typings/Item';

import * as progressDuck from './ducks/progressDuck';
import { CmdPalette } from './presentational/CmdPalette';
import { ComponentsProvider } from './util/components';
import { useList } from './util/useList';

import { CmdPiping } from './CmdPiping';

export interface CmdPalProps {
  commands: Command[];
  components: {}; // TODO
  theme: {}; // TODO
}

export const CmdPal = ({ commands, components, theme }: CmdPalProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [pipe, setPipe] = useState<Prompt[]>([]);

  const [progressState, progressDispatch] = useReducer(
    progressDuck.default,
    progressDuck.initialState,
  );

  const {
    activeDescendant,
    focusedIndex,
    handleMoveFocus,
    handleSearch,
    items,
    reset,
    searchQuery,
  } = useList(commands);

  const handleOpen = useCallback(() => setIsOpened(true), []);

  const handleClose = useCallback(() => {
    setIsOpened(false);
    reset();
  }, [reset]);

  const handleExec = useCallback(
    async (cmd: CommandItem) => {
      handleClose();
      progressDispatch(progressDuck.start(cmd));
      console.group(cmd.id, cmd.label);
      if (Array.isArray(cmd.exec)) {
        setPipe(cmd.exec);
      } else {
        await cmd.exec();
      }
      console.groupEnd();
      progressDispatch(progressDuck.end(cmd));
    },
    [handleClose],
  );

  // TODO
  const handleCommitPipe = useCallback(
    value => {
      console.log('pipe commited', value);
      setPipe([]);
      handleClose();
    },
    [handleClose],
  );

  // TODO
  const handleExitPipe = useCallback(() => setPipe([]), []);

  return (
    <ThemeProvider theme={theme}>
      <ComponentsProvider components={components}>
        {pipe.length > 0 ? (
          <CmdPiping
            name="root"
            onCommit={handleCommitPipe}
            onExit={handleExitPipe}
            pipe={pipe}
          />
        ) : (
          <CmdPalette
            activeDescendant={activeDescendant}
            commands={items}
            focusedIndex={focusedIndex}
            onClose={handleClose}
            onExec={handleExec as any} // TODO
            onMoveFocus={handleMoveFocus}
            onOpen={handleOpen}
            onSearch={handleSearch}
            opened={isOpened}
            progress={progressState.progress}
            query={searchQuery}
            summary={progressState.summary}
          />
        )}
      </ComponentsProvider>
    </ThemeProvider>
  );
};
