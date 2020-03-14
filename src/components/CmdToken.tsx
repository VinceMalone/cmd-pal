import * as React from 'react';
import styled from 'styled-components';

import { useDomId } from '../utils/domId';

import { VisuallyHidden } from './VisuallyHidden';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface AsProps extends ButtonProps {
  'aria-label': string;
  focused: boolean;
}

const TokenContainer = styled.div`
  display: flex;
`;

const TokenButton = styled.button<AsProps>`
  outline: ${props => (props.focused ? '2px solid currentColor' : 'none')};
`;

const DefaultTokenButton: React.FC<AsProps> = ({ children, ...props }) => {
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

export interface CmdTokenProps {
  as?: React.ComponentType<AsProps>;
  children?: React.ReactNode;
  focused?: boolean;
  label: string;
  onClick?(): void;
}

export const CmdToken: React.FC<CmdTokenProps> = ({
  as: As = DefaultTokenButton,
  children,
  focused = false,
  label,
  onClick,
}) => (
  <As
    aria-label={label}
    focused={focused}
    onClick={onClick}
    tabIndex={-1}
    title="Remove"
    type="button"
  >
    {children}
  </As>
);
