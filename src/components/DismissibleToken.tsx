import * as React from 'react';

import { CmdToken, CmdTokenProps } from '../components/CmdToken';
import { remove, useTokensContext } from '../contexts/tokens';

export interface DismissibleTokenProps {
  as?: CmdTokenProps['as'];
  index: number;
  label: string;
}

export const DismissibleToken: React.FC<DismissibleTokenProps> = ({
  as,
  index,
  label,
}) => {
  const { dispatch, state } = useTokensContext();

  const handleClick = React.useCallback(() => dispatch(remove({ index })), [
    dispatch,
    index,
  ]);

  return (
    <CmdToken
      as={as}
      focused={state.focusedIndex === index}
      label={label}
      onClick={handleClick}
    >
      {label}
    </CmdToken>
  );
};
