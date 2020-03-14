import * as React from 'react';

import { CmdToken, CmdTokenProps } from '../components/CmdToken';
import { removeAtIndex, useTokensContext } from '../contexts/tokens';

export interface DismissibleTokenProps {
  as?: CmdTokenProps['as'];
  focused: boolean;
  index: number;
  label: string;
}

export const DismissibleToken: React.FC<DismissibleTokenProps> = ({
  as,
  focused,
  index,
  label,
}) => {
  const { dispatch } = useTokensContext();

  const handleClick = React.useCallback(() => dispatch(removeAtIndex(index)), [
    dispatch,
    index,
  ]);

  return (
    <CmdToken as={as} focused={focused} label={label} onClick={handleClick}>
      {label}
    </CmdToken>
  );
};
