import * as React from 'react';

import { Button, ButtonProps } from '../../components/base/Button';
import { useFocusContext } from '../../contexts/focus';
import { useTokensContext } from '../../contexts/tokens';
import { OptionBag } from '../../types/Option';

import { useMultiOptionPromptContext } from './context';

export interface MultiOptionPromptSubmitProps
  extends Omit<ButtonProps, 'focused'> {}

export const MultiOptionPromptSubmit: React.FC<MultiOptionPromptSubmitProps> = ({
  children = 'Submit',
  ...props
}) => {
  const { submit } = useMultiOptionPromptContext();
  const focused = useFocusContext('submit');
  const { state } = useTokensContext();
  const { tokens } = state;

  const handleClick = React.useCallback(() => {
    submit((tokens as unknown) as readonly OptionBag<unknown, unknown>[]); // TODO: types
  }, [submit, tokens]);

  return (
    <Button
      {...props}
      aria-label="Submit"
      focused={focused}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};
