import * as React from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';

import { useComponents } from '../util/components';

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
`;

type ElementProps = Omit<JSX.IntrinsicElements['input'], 'value'>;

export interface CmdInputProps extends ElementProps {
  label: string;
  value?: string;
}

export const CmdInput = forwardRef<HTMLInputElement, CmdInputProps>(
  ({ label, ...props }, ref) => {
    const components = useComponents();

    return (
      <Input
        {...props}
        aria-label={label}
        as={components.Input}
        autoCorrect="off"
        autoCapitalize="off"
        ref={ref}
        spellCheck={false}
        type="text"
      />
    );
  },
);

CmdInput.displayName = 'CmdInput';
