import * as React from 'react';

import { CmdContainer, CmdContainerProps } from '../../components/CmdContainer';
import { useComponents } from '../../contexts/components';
import { usePromptContext } from '../../contexts/prompt';

export interface MultiChoicePromptContainerProps {
  as?: CmdContainerProps['as'];
  children?: React.ReactNode;
}

export const MultiChoicePromptContainer: React.FC<MultiChoicePromptContainerProps> = ({
  as: As,
  children,
}) => {
  const { Surround } = useComponents();
  const { onExit } = usePromptContext();

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      if (evt.key === 'Tab' && !evt.isDefaultPrevented()) {
        evt.preventDefault();
      } else if (evt.key === 'Escape') {
        onExit();
      }
    },
    [onExit],
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
