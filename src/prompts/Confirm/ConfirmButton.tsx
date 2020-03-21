import * as React from 'react';
import styled from 'styled-components';

import { useConfirmPromptContext } from './context';

const Button = styled.button<{ focused: boolean }>`
  margin: 2px;
  outline: ${props => (props.focused ? 'black dotted 1px' : '')};
`;

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
    const { confirmed, setConfirmed, submit } = useConfirmPromptContext();

    return (
      <Button
        as={as}
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
