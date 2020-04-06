import * as React from 'react';

import { Dialog, DialogProps } from '../../components/base/Dialog';
import { usePromptContext } from '../../contexts/prompt';
import { unfocus, useTokensContext } from '../../contexts/tokens';

type BaseDialogProps = Pick<DialogProps, 'as' | 'children'>;

const DialogUnresolved: React.FC<BaseDialogProps> = props => {
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

  return <Dialog {...props} onKeyDown={handleKeyDown} />;
};

const DialogReady: React.FC<BaseDialogProps> = props => {
  const { dispatch } = useTokensContext();

  const dialogRef = React.useRef<HTMLElement>(null);

  const handleClick = React.useCallback(() => {
    // TODO
    // dialogRef.current?.querySelector('input')?.focus();
    dispatch(unfocus());
  }, [dispatch]);

  return <Dialog {...props} onClick={handleClick} ref={dialogRef} />;
};

export interface MultiOptionPromptDialogProps extends BaseDialogProps {
  ready?: boolean;
}

export const MultiOptionPromptDialog: React.FC<MultiOptionPromptDialogProps> = ({
  ready = false,
  ...props
}) => {
  const DialogComponent = ready ? DialogReady : DialogUnresolved;
  return <DialogComponent {...props} />;
};
