import * as React from 'react';

import { CmdContainer, CmdContainerProps } from '../../components/CmdContainer';
import { usePromptContext } from '../../contexts/prompt';
import { useAutoFocus } from '../../utils/useAutoFocus';

import { useListPromptContext } from './context';

export interface ListPromptContainerProps {
  as?: CmdContainerProps['as'];
  children?: React.ReactNode;
  onKeyDown?(evt: React.KeyboardEvent<HTMLElement>): void;
}

export const ListPromptContainer: React.FC<ListPromptContainerProps> = ({
  as,
  children,
  onKeyDown,
}) => {
  const { onExit } = usePromptContext();

  const containerRef = React.useRef<HTMLElement>(null);
  useAutoFocus(containerRef, true);

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      if (onKeyDown != null) {
        onKeyDown(evt);
      }

      if (evt.key === 'Tab' && !evt.isDefaultPrevented()) {
        evt.preventDefault();
      } else if (evt.key === 'Escape') {
        onExit();
      }
    },
    [onExit, onKeyDown],
  );

  return (
    <CmdContainer
      as={as}
      onKeyDown={handleKeyDown}
      onOutsideClick={onExit}
      ref={containerRef}
    >
      {children}
    </CmdContainer>
  );
};

export interface ListPromptContainerReadyProps {
  as?: ListPromptContainerProps['as'];
  children?: React.ReactNode;
}

export const ListPromptContainerReady: React.FC<ListPromptContainerReadyProps> = ({
  as,
  children,
}) => {
  const { submit } = useListPromptContext();

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      switch (evt.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          evt.preventDefault();
          // TODO
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          evt.preventDefault();
          // TODO
          break;
        case 'Enter': {
          if (evt.shiftKey) {
            const list: string[] = []; // TODO
            submit(list);
          }
          break;
        }
      }
    },
    [submit],
  );

  return (
    <ListPromptContainer as={as} onKeyDown={handleKeyDown}>
      {children}
    </ListPromptContainer>
  );
};
