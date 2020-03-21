import * as React from 'react';

import { useTokensContext } from '../contexts/tokens';

import { DismissibleToken, DismissibleTokenProps } from './DismissibleToken';

export interface DismissibleTokensProps {
  as?: DismissibleTokenProps['as'];
}

export const DismissibleTokens: React.FC<DismissibleTokensProps> = ({ as }) => {
  const { state } = useTokensContext();

  return (
    <>
      {state.tokens.map((token, index) => (
        <DismissibleToken
          as={as}
          index={index}
          key={token.id}
          label={token.label}
        />
      ))}
    </>
  );
};
