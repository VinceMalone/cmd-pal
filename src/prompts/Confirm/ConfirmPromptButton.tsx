import * as React from 'react';

import { Button, ButtonComponent } from '../../components/base/Button';
import { useComponent } from '../../contexts/components';

import { useConfirmPromptContext } from './context';

export type ConfirmPromptButtonComponent = ButtonComponent;

export interface ConfirmButtonProps {
  as?: ConfirmPromptButtonComponent;
  children?: React.ReactNode;
}

const createConfirmButton = (
  value: boolean,
  defaultChildren: React.ReactNode,
) => {
  return function ConfirmButton({
    as,
    children = defaultChildren,
  }: ConfirmButtonProps) {
    const ConfirmButton = useComponent('ConfirmPromptButton', as);
    const { confirmed, setConfirmed, submit } = useConfirmPromptContext();

    return (
      <Button
        as={ConfirmButton}
        focused={confirmed === value}
        onClick={() => {
          setConfirmed(value);
          submit(value);
        }}
        tabIndex={-1}
        type="button"
      >
        {children}
      </Button>
    );
  };
};

export const ConfirmButtonYes = createConfirmButton(true, 'Yes');
export const ConfirmButtonNo = createConfirmButton(false, 'No');
