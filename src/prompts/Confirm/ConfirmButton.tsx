import * as React from 'react';

import { useComponent } from '../../contexts/components';

import { useConfirmPromptContext } from './context';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  focused: boolean;
}

interface ConfirmButtonProps {
  as?: React.ComponentType<ButtonProps>;
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
    const Button = useComponent('Button', as, 'button');
    const { confirmed, setConfirmed, submit } = useConfirmPromptContext();

    return (
      <Button
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
