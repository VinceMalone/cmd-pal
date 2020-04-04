import * as React from 'react';
import styled from 'styled-components';

import { useComponent } from '../../contexts/components';

export const gapProp = '--token-field-gap';

const BaseTokenField = styled.div`
  ${gapProp}: 0.1em;
  padding: var(${gapProp});
  margin: calc(var(${gapProp}) * -2);
`;

interface TokenFieldComponentProps {
  children?: React.ReactNode;
}

export type TokenFieldComponent = React.ComponentType<TokenFieldComponentProps>;

export interface TokenFieldProps {
  as?: TokenFieldComponent;
  children?: React.ReactNode;
}

export const TokenField: React.FC<TokenFieldProps> = ({ as, children }) => {
  const TokenFieldComponent = useComponent('TokenField', as);
  return <BaseTokenField as={TokenFieldComponent}>{children}</BaseTokenField>;
};
