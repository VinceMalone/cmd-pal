import * as React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
`;

type ElementProps = React.RefAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

export interface CmdInputProps extends ElementProps {
  as?: React.ComponentType<ElementProps>; // TODO: is `ref` in here?
  label: string;
}

export const CmdInput = React.forwardRef<HTMLInputElement, CmdInputProps>(
  ({ as, label, type = 'text', ...props }, ref) => (
    <Input {...props} aria-label={label} as={as} ref={ref} type={type} />
  ),
);

CmdInput.displayName = 'CmdInput';
