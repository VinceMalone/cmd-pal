import * as React from 'react';

import { Button, ButtonProps } from '../../components/base/Button';
import { useFocusContext } from '../../contexts/focus';
import { useTokensContext } from '../../contexts/tokens';
import { Choice } from '../../types/Choice';

import { useMultiChoicePromptContext } from './context';

export interface MultiChoicePromptSubmitProps
  extends Omit<ButtonProps, 'focused'> {}

export const MultiChoicePromptSubmit: React.FC<MultiChoicePromptSubmitProps> = ({
  children = 'Submit',
  ...props
}) => {
  const { submit } = useMultiChoicePromptContext();
  const focused = useFocusContext('submit');
  const { state } = useTokensContext();
  const { tokens } = state;

  const handleClick = React.useCallback(() => {
    submit((tokens as unknown) as readonly Choice<unknown, unknown>[]); // TODO: types
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
