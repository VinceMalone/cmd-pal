import * as React from 'react';

import { CmdTokenGroup } from '../../components/CmdTokenGroup';
import { DismissibleToken } from '../../components/DismissibleToken';
import { useComponents } from '../../contexts/components';
import { useTokensContext } from '../../contexts/tokens';

import { MultiChoiceSearch } from './MultiChoiceSearch';

export interface MultiChoiceTokensProps {}

export const MultiChoiceTokens: React.FC<MultiChoiceTokensProps> = () => {
  const components = useComponents();
  const { state } = useTokensContext();

  return (
    <CmdTokenGroup as={components.TokenGroup}>
      {state.tokens.map((token, index) => (
        <DismissibleToken
          as={components.Token}
          focused={state.focusedIndex === index}
          index={index}
          key={token.id}
          label={token.label}
        />
      ))}
      <MultiChoiceSearch />
    </CmdTokenGroup>
  );
};
