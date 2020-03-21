import * as React from 'react';
import { useMeasure } from 'react-use';
import styled, { css } from 'styled-components';

import {
  moveFocus,
  removeAtIndex,
  removeAtOffset,
  unfocus,
  useTokensContext,
} from '../contexts/tokens';
import { Token } from '../types/Token';
import { useAutoFocus } from '../utils/useAutoFocus';

const noop = () => undefined;

const Container = styled.div`
  box-sizing: border-box;
  display: inline-block;
  max-width: 100%;
  position: relative;
  padding: var(--cmd-pal--token-gap);
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

export interface InputTokenProps<T extends Token> {
  as?: React.ComponentType<{}>;
  onArrowDown?(evt: React.KeyboardEvent<HTMLElement>): void;
  onArrowUp?(evt: React.KeyboardEvent<HTMLElement>): void;
  onChange(value: string): void;
  onSelect(): void;
  onSubmit(tokens: readonly T[]): void;
  value: string;
}

export const InputToken = <T extends Token>({
  as,
  onArrowDown = noop,
  onArrowUp = noop,
  onChange,
  onSelect,
  onSubmit,
  value,
}: InputTokenProps<T>): React.ReactElement => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  useAutoFocus(inputRef, true);

  const [valueRef, valueRect] = useMeasure();

  const { dispatch, state } = useTokensContext();
  const { focusedIndex, tokens } = state;

  // TODO: handle _don't unfocus_
  // ... this sucks (and probably breaks things)
  const handleBlur = () => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  const handleArrowX = (
    evt: React.KeyboardEvent<HTMLElement>,
    delta: number,
  ) => {
    if (value.length === 0) {
      evt.preventDefault();
      dispatch(moveFocus(delta));
    }
  };

  const handleBackspace = (evt: React.KeyboardEvent<HTMLElement>) => {
    if (evt.repeat || value.length > 0) {
      return;
    }

    const delta = focusedIndex > -1 ? 0 : evt.key === 'Delete' ? 1 : -1;
    dispatch(removeAtOffset(delta));
  };

  const handleEnter = (evt: React.KeyboardEvent<HTMLElement>) => {
    if (focusedIndex !== -1) {
      dispatch(removeAtIndex(focusedIndex));
    } else if (evt.shiftKey) {
      onSubmit(tokens as readonly T[]);
    } else {
      onSelect();
    }
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
    switch (evt.key) {
      case 'ArrowDown':
        return onArrowDown(evt);
      case 'ArrowLeft':
        return handleArrowX(evt, -1);
      case 'ArrowRight':
        return handleArrowX(evt, 1);
      case 'ArrowUp':
        return onArrowUp(evt);
      case 'Backspace':
      case 'Delete':
        return handleBackspace(evt);
      case 'Enter':
        return handleEnter(evt);
      case 'Tab':
        evt.preventDefault();
        break;
    }
  };

  return (
    <Container as={as}>
      <TextValue aria-hidden="true" ref={valueRef}>
        {value}
      </TextValue>
      <TextInput
        aria-label="TODO: maybe require a `label` prop?"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onChange={evt => {
          onChange(evt.target.value);
          if (focusedIndex > -1) {
            dispatch(unfocus());
          }
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        spellCheck={false}
        style={{
          opacity: focusedIndex === -1 ? '1' : '0',
          width: `calc(2ch + ${Math.ceil(valueRect.width) + 2}px)`,
        }}
        type="text"
        value={value}
      />
    </Container>
  );
};