import * as React from 'react';
import styled from 'styled-components';

import { useDomId } from '../utils/domId';

import { VisuallyHidden } from './VisuallyHidden';

const TokenContainer = styled.div`
  display: flex;
`;

const TokenButton = styled.button<DefaultTokenButtonProps>`
  outline: ${props => (props.focused ? '2px solid currentColor' : 'none')};
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface DefaultTokenButtonProps extends ButtonProps {
  'aria-label': string;
  focused: boolean;
}

export const DefaultTokenButton: React.FC<DefaultTokenButtonProps> = ({
  children,
  ...props
}) => {
  const labelId = useDomId('token-label');

  return (
    <TokenContainer>
      <VisuallyHidden id={labelId}>{children}</VisuallyHidden>
      <TokenButton {...props} aria-label="Remove" aria-describedby={labelId}>
        {children}&ensp;⊗
      </TokenButton>
    </TokenContainer>
  );
};
