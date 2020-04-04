import * as React from 'react';
import styled from 'styled-components';

import { useExperiments } from '../../components/Experiments';
import { useComponent } from '../../contexts/components';
import { remove, useTokensContext } from '../../contexts/tokens';
import { useDomId } from '../../utils/domId';
import { VisuallyHidden } from '../VisuallyHidden';

import { gapProp } from './TokenField';

const DefaultTokenContainer = styled.div`
  box-sizing: border-box;
  display: inline-flex;
  padding: var(${gapProp});
`;

const DefaultTokenButton = styled.button<{ focused: boolean }>`
  outline: ${props => (props.focused ? 'black dotted 1px' : 'none')};
`;

const DefaultTokenRemoveIcon = styled.span.attrs(() => ({ children: 'ⓧ' }))`
  font-family: monospace;
`;

const DefaultToken: React.FC<TokenComponentProps> = ({
  children,
  ...props
}) => {
  const labelId = useDomId('token-label');

  return (
    <DefaultTokenContainer>
      <VisuallyHidden id={labelId}>{children}</VisuallyHidden>
      <DefaultTokenButton
        {...props}
        aria-label="Remove"
        aria-describedby={labelId}
      >
        {children}&ensp;
        <DefaultTokenRemoveIcon />
      </DefaultTokenButton>
    </DefaultTokenContainer>
  );
};

type HtmlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.RefAttributes<HTMLButtonElement>;

interface TokenComponentProps extends HtmlButtonProps {
  focused: boolean;
}

export type TokenComponent = React.ElementType<TokenComponentProps>;

export interface TokenProps {
  as?: TokenComponent;
  children?: React.ReactNode;
  index: number;
  label: string;
}

export const Token: React.FC<TokenProps> = ({ as, children, index, label }) => {
  const TokenComponent = useComponent('Token', as, DefaultToken);

  const { dispatch, state } = useTokensContext();

  const handleClick = React.useCallback(() => dispatch(remove({ index })), [
    dispatch,
    index,
  ]);

  return (
    <TokenComponent
      aria-label={label}
      focused={index === state.focusedIndex}
      onClick={handleClick}
      tabIndex={-1}
      title="Remove"
      type="button"
    >
      {children}
    </TokenComponent>
  );
};

export interface TokensProps extends Pick<TokenProps, 'as'> {}

export const Tokens: React.FC<TokensProps> = ({ as }) => {
  const { experiment } = useExperiments();
  const { state } = useTokensContext();

  let tokens = state.tokens;
  if (experiment('TOKEN_ORDER', 'SAME_AS_LIST')) {
    tokens = [...tokens].sort((a, b) => (a.ordinal ?? -1) - (b.ordinal ?? -1));
  }

  return (
    <>
      {tokens.map((token, index) => (
        <Token as={as} index={index} key={token.id} label={token.label}>
          {token.label}
        </Token>
      ))}
    </>
  );
};
