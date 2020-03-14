import * as React from 'react';
import { useMeasure } from 'react-use';
import styled, { css } from 'styled-components';

import { unfocus, useTokensContext } from '../../contexts/tokens';
import { useAutoFocus } from '../../utils/useAutoFocus';

const Container = styled.div`
  position: relative;
`;

const textReset = css`
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-indent: inherit;
  text-shadow: inherit;
  text-transform: inherit;
  word-spacing: inherit;
`;

const TextInput = styled.input`
  ${textReset}
  background: none;
  border: none;
  box-sizing: content-box;
  max-width: 100%;
  outline: none;
  padding: 0;
`;

const TextValue = styled.div`
  pointer-events: none;
  position: absolute;
  visibility: hidden;
  white-space: pre;
`;

const useFocusOnChange = (): [boolean, () => void] => {
  const { dispatch, state } = useTokensContext();
  const isFocused = state.focusedIndex === -1;

  const handleChange = React.useCallback(() => {
    if (!isFocused) {
      dispatch(unfocus());
    }
  }, [dispatch, isFocused]);

  return [isFocused, handleChange];
};

export interface ListPromptTextInputProps {}

export const ListPromptTextInput: React.FC<ListPromptTextInputProps> = () => {
  const [value, setValue] = React.useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);
  useAutoFocus(inputRef, true);

  const [valueRef, valueRect] = useMeasure();

  const [isFocused, focusOnChange] = useFocusOnChange();

  return (
    <Container>
      <TextValue aria-hidden="true" ref={valueRef}>
        {value}
      </TextValue>
      <TextInput
        aria-label="TODO."
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onChange={evt => {
          setValue(evt.target.value);
          focusOnChange();
        }}
        ref={inputRef}
        spellCheck={false}
        style={{
          opacity: isFocused ? '1' : '0',
          width: `${Math.ceil(valueRect.width) + 2}px`,
        }}
        type="text"
        value={value}
      />
    </Container>
  );
};
