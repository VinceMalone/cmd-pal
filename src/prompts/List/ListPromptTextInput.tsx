import * as React from 'react';

import { InputToken } from '../../components/InputToken';
import { add, moveFocus, useTokensContext } from '../../contexts/tokens';

import { useListPromptContext } from './context';

export interface ListPromptTextInputProps {}

export const ListPromptTextInput: React.FC<ListPromptTextInputProps> = () => {
  const { dispatch } = useTokensContext();
  const { submit } = useListPromptContext();

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
    if (value.trim().length > 0) {
      // TODO: handle duplicates
      dispatch(add({ id: value, label: value }));
      setValue('');
    }
  };

  return (
    <InputToken
      onArrowDown={evt => handleArrowY(evt, 1)}
      onArrowUp={evt => handleArrowY(evt, -1)}
      onChange={setValue}
      onSelect={handleSelect}
      onSubmit={tokens => submit(tokens.map(token => token.id))}
      value={value}
    />
  );
};
