import * as React from 'react';
import styled from 'styled-components';

import { gapProp } from '../../src/components/base/TokenField';
import { useDomId } from '../../src/utils/domId';

import { DismissButton } from './DismissButton';
import { body, dark } from './typography';

const height = 1.5;
const vSpace = 6 / 16;

const Container = styled.div`
  ${body}
  ${dark}
  align-items: center;
  background-color: rgb(224, 224, 224);
  border-radius: 0.1875em;
  cursor: default;
  display: inline-flex;
  line-height: ${height - vSpace}em;
  margin: var(${gapProp});
`;

const Label = styled.div`
  padding: ${vSpace / 2}em 0.375em;
  white-space: pre-wrap;
`;

const TokenDismissButton = styled(DismissButton)<{ focused: boolean }>`
  background-color: ${props =>
    props.focused ? 'rgb(214, 235, 255)' : 'transparent'};
  border-radius: inherit;
  box-shadow: ${props =>
    props.focused ? 'inset 0 0 0 2px rgba(0, 122, 204, 0.4)' : ''};
  cursor: pointer;
  flex-shrink: 0;
  font-size: ${height}em;
`;

type HtmlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export interface TokenProps extends HtmlButtonProps {
  focused: boolean;
}

export const Token: React.FC<TokenProps> = ({ children, ...props }) => {
  const labelId = useDomId('token-label');

  return (
    <Container>
      <Label id={labelId}>{children}</Label>
      <TokenDismissButton
        {...props}
        aria-label="Remove"
        aria-describedby={labelId}
      />
    </Container>
  );
};
