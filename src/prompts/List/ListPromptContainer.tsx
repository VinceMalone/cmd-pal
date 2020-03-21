import * as React from 'react';

import { CmdContainer, CmdContainerProps } from '../../components/CmdContainer';
import { useComponents } from '../../contexts/components';
import { usePromptContext } from '../../contexts/prompt';
import { add, useTokensContext } from '../../contexts/tokens';
import { useAutoFocus } from '../../utils/useAutoFocus';

import { useListPromptContext } from './context';

export interface ListPromptContainerProps {
  as?: CmdContainerProps['as'];
  children?: React.ReactNode;
  onKeyDown?(evt: React.KeyboardEvent<HTMLElement>): void;
}

export const ListPromptContainer: React.FC<ListPromptContainerProps> = ({
  as: As,
  children,
  onKeyDown,
}) => {
  const { Surround } = useComponents();
  const { onExit } = usePromptContext();

  const containerRef = React.useRef<HTMLElement>(null);
  // useAutoFocus(containerRef, true); // TODO: this is "standard", but focus should really be given to the input

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
