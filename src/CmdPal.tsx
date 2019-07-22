import * as React from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import { ThemeProvider } from 'styled-components';

import { Command, CommandItem } from '../typings/Command';

import reducer, * as duck from './duck';
import { CmdPalette } from './presentational/CmdPalette';
import { ComponentsProvider } from './util/components';

export interface CmdPalProps {
  commands: Command[];
  components: {}; // TODO
  theme: {}; // TODO
}

export const CmdPal = ({ commands, components, theme }: CmdPalProps) => {
  const [state, dispatch] = useReducer(reducer, duck.initialState);

  useEffect(() => {
    dispatch(duck.setCommands(commands));
  }, [commands]);

  const handleExec = useCallback(async (cmd: CommandItem) => {
    dispatch(duck.close());
    dispatch(duck.execStart(cmd));
    await cmd.exec();
    dispatch(duck.execEnd(cmd));
  }, []);

  const handleClose = useCallback(() => dispatch(duck.close()), []);
  const handleMoveFocus = useCallback((delta: number) => dispatch(duck.moveFocus(delta)), []);
  const handleOpen = useCallback(() => dispatch(duck.open()), []);
  const handleSearch = useCallback((query: string) => dispatch(duck.search(query)), []);

  return (
    <ThemeProvider theme={theme}>
      <ComponentsProvider components={components}>
        <CmdPalette
          activeDescendant={state.activeDescendant}
          commands={state.commands}
          focusedIndex={state.focusedIndex}
          onClose={handleClose}
          onExec={handleExec}
          onMoveFocus={handleMoveFocus}
          onOpen={handleOpen}
          onSearch={handleSearch}
          opened={state.opened}
          progress={state.progress}
          query={state.query}
          summary={state.summary}
        />
      </ComponentsProvider>
    </ThemeProvider>
  );
};
