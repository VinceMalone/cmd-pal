import * as React from 'react';

import { Dialog, DialogProps } from '../../components/base/Dialog';
import { usePromptContext } from '../../contexts/prompt';

export interface SingleChoicePromptContainerProps {
  as?: DialogProps['as'];
  children?: React.ReactNode;
}

export const SingleChoicePromptContainer: React.FC<SingleChoicePromptContainerProps> = ({
  as,
  children,
}) => {
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
    <Dialog as={as} onKeyDown={handleKeyDown}>
      {children}
    </Dialog>
  );
};
