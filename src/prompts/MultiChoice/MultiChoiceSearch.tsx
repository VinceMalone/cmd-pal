import * as React from 'react';
import { useMeasure } from 'react-use';
import styled, { css } from 'styled-components';

import { search, useListContext } from '../../contexts/list';
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

const useListSearchQuery = (): [
  string,
  (evt: React.ChangeEvent<HTMLInputElement>) => void,
] => {
  const { dispatch, state } = useListContext();

  const handleChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(search(evt.target.value));
    },
    [dispatch],
  );

  return [state.searchQuery, handleChange];
};

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

export interface MultiChoiceSearchProps {}

export const MultiChoiceSearch: React.FC<MultiChoiceSearchProps> = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  useAutoFocus(inputRef, true);

  const [valueRef, valueRect] = useMeasure();

  const [value, onChange] = useListSearchQuery();
  const [isFocused, focusOnChange] = useFocusOnChange();

  const handleBlur = React.useCallback(() => {
    if (inputRef.current != null) {
      // TODO: this sucks (and probably breaks things)
      inputRef.current.focus();
    }
  }, []);

  return (
    <Container>
      <TextValue aria-hidden="true" ref={valueRef}>
        {value}
      </TextValue>
      <TextInput
        aria-autocomplete="list"
        aria-haspopup="true"
        aria-label="Type to narrow down results."
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onBlur={handleBlur}
        onChange={evt => {
          onChange(evt);
          focusOnChange();
        }}
        ref={inputRef}
        // role="combobox" // TODO: is this correct?
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
