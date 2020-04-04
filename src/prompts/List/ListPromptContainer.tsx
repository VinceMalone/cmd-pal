import * as React from 'react';

import { Dialog, DialogProps } from '../../components/base/Dialog';
import { usePromptContext } from '../../contexts/prompt';
import { add, useTokensContext } from '../../contexts/tokens';
import { useAutoFocus } from '../../utils/useAutoFocus';

import { useListPromptContext } from './context';

export interface ListPromptContainerProps {
  as?: DialogProps['as'];
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
    <Dialog as={as} onKeyDown={handleKeyDown} ref={containerRef}>
      {children}
    </Dialog>
  );
};
