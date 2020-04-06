import * as React from 'react';

import { Dialog, DialogProps } from '../../components/base/Dialog';
import { usePromptContext } from '../../contexts/prompt';
import { useAutoFocus } from '../../utils/useAutoFocus';

import { useConfirmPromptContext } from './context';

type BaseDialogProps = Pick<DialogProps, 'as' | 'children' | 'onKeyDown'>;

const BaseDialog: React.FC<BaseDialogProps> = ({ onKeyDown, ...props }) => {
  const { onExit } = usePromptContext();

  const dialogRef = React.useRef<HTMLElement>(null);
  useAutoFocus(dialogRef, true);

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

  return <Dialog {...props} onKeyDown={handleKeyDown} ref={dialogRef} />;
};

const DialogReady: React.FC<BaseDialogProps> = props => {
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

  return <BaseDialog {...props} onKeyDown={handleKeyDown} />;
};

export interface ConfirmPromptDialogProps extends BaseDialogProps {
  ready?: boolean;
}

export const ConfirmPromptDialog: React.FC<ConfirmPromptDialogProps> = ({
  ready = false,
  ...props
}) => {
  const DialogComponent = ready ? DialogReady : BaseDialog;
  return <DialogComponent {...props} />;
};
