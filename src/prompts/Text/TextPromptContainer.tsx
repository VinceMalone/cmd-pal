import * as React from 'react';

import { Dialog, DialogProps } from '../../components/base/Dialog';
import { usePromptContext } from '../../contexts/prompt';

export interface TextPromptContainerProps {
  as?: DialogProps['as'];
  children?: React.ReactNode;
  onKeyDown?(evt: React.KeyboardEvent<HTMLElement>): void;
}

export const TextPromptContainer: React.FC<TextPromptContainerProps> = ({
  as,
  children,
  onKeyDown,
}) => {
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
    <Dialog as={as} onKeyDown={handleKeyDown}>
      {children}
    </Dialog>
  );
};
