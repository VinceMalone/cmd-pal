import * as React from 'react';

import { CmdContainer, CmdContainerProps } from '../../components/CmdContainer';
import { usePromptContext } from '../../contexts/prompt';
import { useAutoFocus } from '../../utils/useAutoFocus';

import { useConfirmPromptContext } from './context';

export interface ConfirmContainerProps {
  as?: CmdContainerProps['as'];
  children?: React.ReactNode;
  onKeyDown?(evt: React.KeyboardEvent<HTMLElement>): void;
}

export const ConfirmContainer: React.FC<ConfirmContainerProps> = ({
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

export interface ConfirmContainerReadyProps {
  as?: ConfirmContainerProps['as'];
  children?: React.ReactNode;
}

export const ConfirmContainerReady: React.FC<ConfirmContainerReadyProps> = ({
  as,
  children,
}) => {
  const { confirmed, setConfirmed, submit } = useConfirmPromptContext();

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      switch (evt.key) {
        case 'y':
        case 'Y':
          return setConfirmed(true);
        case 'n':
        case 'N':
          return setConfirmed(false);
        case 'Tab':
          evt.preventDefault();
          setConfirmed(x => !x);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          evt.preventDefault();
          setConfirmed(x => !x);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          evt.preventDefault();
          setConfirmed(x => !x);
          break;
        case ' ':
        case 'Enter':
          return submit(confirmed);
      }
    },
    [confirmed, setConfirmed, submit],
  );

  return (
    <ConfirmContainer as={as} onKeyDown={handleKeyDown}>
      {children}
    </ConfirmContainer>
  );
};
