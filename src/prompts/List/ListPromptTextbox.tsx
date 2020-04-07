import * as React from 'react';

import {
  TextboxToken,
  TextboxTokenProps,
} from '../../components/base/TextboxToken';
import { add, moveFocus, useTokensContext } from '../../contexts/tokens';

import { useListPromptContext } from './context';

export interface ListPromptTextboxProps extends Pick<TextboxTokenProps, 'as'> {}

export const ListPromptTextbox: React.FC<ListPromptTextboxProps> = ({ as }) => {
  const { submit } = useListPromptContext();
  const { dispatch, state } = useTokensContext();
  const { tokens } = state;

  const [value, setValue] = React.useState('');

  const handleArrowY = (
    evt: React.KeyboardEvent<HTMLElement>,
    delta: number,
  ) => {
    if (value.length === 0) {
      evt.preventDefault();
      dispatch(moveFocus({ delta }));
    }
  };

  const handleSelect = () => {
    // Can't be _empty_ and won't add duplicates
    if (value.trim().length > 0 && tokens.every(({ id }) => id !== value)) {
      dispatch(add({ id: value, label: value }));
      setValue('');
    }
  };

  return (
    <TextboxToken
      as={as}
      onArrowDown={evt => handleArrowY(evt, 1)}
      onArrowUp={evt => handleArrowY(evt, -1)}
      onChange={setValue}
      onSelect={handleSelect}
      onSubmit={tokens => submit(tokens.map(token => token.id))}
      value={value}
    />
  );
};
