import * as React from 'react';

import { CmdContainer, CmdContainerProps } from '../../components/CmdContainer';
import { useComponents } from '../../contexts/components';
import { usePromptContext } from '../../contexts/prompt';

export interface TextPromptContainerProps {
  as?: CmdContainerProps['as'];
  children?: React.ReactNode;
  onKeyDown?(evt: React.KeyboardEvent<HTMLElement>): void;
}

export const TextPromptContainer: React.FC<TextPromptContainerProps> = ({
  as: As,
  children,
  onKeyDown,
}) => {
  const { Surround } = useComponents();
  const { onExit } = usePromptContext();

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
    >
      {children}
    </CmdContainer>
  );
};
