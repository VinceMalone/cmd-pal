import * as React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { moveFocus, reset, useListContext } from '../list';
import { usePromptContext } from '../prompt';
import { useHotkeys } from '../util/useHotkeys';
import { useOnOutsideClick } from '../util/useOnOutsideClick';

const Container = styled.div`
  left: 50%;
  max-width: ${props => props.theme.maxWidth};
  position: fixed;
  top: ${props => props.theme.offsetTop};
  transform: translateX(-50%);
  width: calc(100% - ${props => props.theme.offsetSides});
  z-index: ${props => props.theme.zIndex};
`;

const Surround = styled.div`
  display: flex;
  flex-direction: column;
  /* max-height: calc(100vh - ${props => props.theme.maxHeight}); */
`;

export interface PromptProps {
  as?: React.ComponentType<{}>;
  children?: React.ReactNode;
}

export const Prompt: React.FC<PromptProps> = ({ as, children }) => {
  const { dispatch, state } = useListContext();
  const prompt = usePromptContext();

  const parent = document.body;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleClose = React.useCallback(() => {
    // TODO: what happens when _executing_ a command
    prompt.close();
    prompt.setProgress(false);
    dispatch(reset());
  }, [dispatch, prompt]);

  useHotkeys('option+shift+p', prompt.open);
  useHotkeys('escape', handleClose);
  useOnOutsideClick(containerRef, handleClose);

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      if (prompt.state.inProgress) {
        return;
      }

      switch (evt.key) {
        case 'ArrowDown':
          evt.preventDefault();
          dispatch(moveFocus(1));
          break;
        case 'ArrowUp':
          evt.preventDefault();
          dispatch(moveFocus(-1));
          break;
        case 'Enter':
          prompt.exec(state.focusedIndex);
          break;
      }
    },
    [dispatch, prompt, state.focusedIndex],
  );

  return (
    <>
      {prompt.state.isOpen &&
        createPortal(
          // TODO: add `role`
          <Container onKeyDown={handleKeyDown} ref={containerRef} tabIndex={0}>
            <Surround as={as}>{children}</Surround>
          </Container>,
          parent,
        )}
    </>
  );
};
