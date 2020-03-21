import * as React from 'react';

import { CmdContainer, CmdContainerProps } from '../../components/CmdContainer';
import { useComponents } from '../../contexts/components';
import { usePromptContext } from '../../contexts/prompt';
import { useAutoFocus } from '../../utils/useAutoFocus';

import { useConfirmPromptContext } from './context';

export interface ConfirmPromptContainerProps {
  as?: CmdContainerProps['as'];
  children?: React.ReactNode;
  onKeyDown?(evt: React.KeyboardEvent<HTMLElement>): void;
}

export const ConfirmPromptContainer: React.FC<ConfirmPromptContainerProps> = ({
  as: As,
  children,
  onKeyDown,
}) => {
  const { Surround } = useComponents();
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
      as={As ?? Surround}
      onKeyDown={handleKeyDown}
      onOutsideClick={onExit}
      ref={containerRef}
    >
      {children}
    </CmdContainer>
  );
};

export interface ConfirmPromptContainerReadyProps {
  as?: ConfirmPromptContainerProps['as'];
  children?: React.ReactNode;
}

export const ConfirmPromptContainerReady: React.FC<ConfirmPromptContainerReadyProps> = ({
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
    <ConfirmPromptContainer as={as} onKeyDown={handleKeyDown}>
      {children}
    </ConfirmPromptContainer>
  );
};
