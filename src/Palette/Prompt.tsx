import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as tb from 'ts-toolbelt';

import { PromptProvider } from '../contexts/prompt';
import { useHotkeys } from '../utils/useHotKeys';

import { usePaletteContext } from './context';
import * as duck from './duck';

export interface PromptProps {
  container?: Element;
  openOn: string;
}

export const Prompt: React.FC<PromptProps> = ({
  container = document.body,
  openOn,
}) => {
  const { dispatch, state } = usePaletteContext();

  useHotkeys(
    openOn,
    React.useCallback(() => dispatch(duck.open()), [dispatch]),
  );

  const handleCommit = React.useCallback(
    async (value: tb.M.Promisable<unknown>) => {
      dispatch(duck.resolve('TODO: add summary to function parameters'));
      dispatch(duck.commit(await value));
    },
    [dispatch],
  );

  const handleExit = React.useCallback(() => {
    dispatch(duck.close());
  }, [dispatch]);

  // Close the palette when the last prompt in the pipe resolves
  // TODO: check that this happens _after_ the last resolve
  React.useEffect(() => {
    if (state.currentIndex === state.pipe.length) {
      handleExit();
    }
  }, [handleExit, state.currentIndex, state.pipe.length]);

  return (
    <>
      {state.isOpen && (
        <PromptProvider
          onCommit={handleCommit}
          onExit={handleExit}
          value={state.value}
        >
          {ReactDOM.createPortal(
            <React.Fragment key={state.currentIndex.toString()}>
              {state.pipe[state.currentIndex]}
            </React.Fragment>,
            container,
          )}
        </PromptProvider>
      )}
    </>
  );
};
