import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import * as tb from 'ts-toolbelt';

import { PromptPipe, Resolvable } from '../typings/Component';

import { ComponentsProvider } from './contexts/components';
import {
  PaletteProvider,
  close,
  endPending,
  next,
  open,
  startPending,
  usePaletteContext,
} from './contexts/palette';
import { PromptProvider } from './contexts/prompt';
import { useHotkeys } from './utils/useHotkeys';

export interface PaletteProps<T extends tb.L.List<Resolvable>> {
  components: any; // TODO
  pipe: PromptPipe<T>;
  theme: any; // TODO
}

interface PaletteComponent {
  <T extends tb.L.List<Resolvable>>(
    props: PaletteProps<T>,
  ): React.ReactElement | null;
  displayName?: string;
}

export const Palette: PaletteComponent = ({ components, pipe, theme }) => (
  <ThemeProvider theme={theme}>
    <ComponentsProvider components={components}>
      <PaletteProvider pipe={pipe}>
        <Prompt />
      </PaletteProvider>
    </ComponentsProvider>
  </ThemeProvider>
);

const Prompt: React.FC = () => {
  const { dispatch, state } = usePaletteContext();

  useHotkeys(
    'option+shift+p',
    React.useCallback(() => dispatch(open()), [dispatch]),
  );

  const handleCommit = React.useCallback(
    async (value: tb.M.Promisable<unknown>) => {
      // TODO: add `summary` to pending state
      // TODO: consider just two actions -- `resolve()` and `commit(value)`
      dispatch(startPending());
      dispatch(next(await value));
      dispatch(endPending());
    },
    [dispatch],
  );

  const handleExit = React.useCallback(() => {
    dispatch(close());
  }, [dispatch]);

  console.log(state);

  return (
    <>
      {state.isOpen && (
        <PromptProvider
          onCommit={handleCommit}
          onExit={handleExit}
          value={state.value}
        >
          {state.pipe[state.currentIndex]}
        </PromptProvider>
      )}
    </>
  );
};
