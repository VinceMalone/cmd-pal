import * as React from 'react';
import { useMeasure } from 'react-use';
import styled, { css } from 'styled-components';

import { useExperiments } from '../components/Experiments';
import {
  moveFocus,
  remove,
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
  /* visibility: hidden; */
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
  const { experiment } = useExperiments();

  const inputRef = React.useRef<HTMLInputElement>(null);
  useAutoFocus(inputRef, true);

  const [valueRef, valueRect] = useMeasure();

  const { dispatch, state } = useTokensContext();
  const { focusedIndex, tokens } = state;

  // TODO: handle _don't unfocus_
  // ... this sucks (and probably breaks things)
  const handleBlur = () => {
    setTimeout(() => {
      if (inputRef.current != null) {
        inputRef.current.focus();
      }
    }, 1);
  };

  const handleArrowX = (
    evt: React.KeyboardEvent<HTMLInputElement>,
    delta: number,
  ) => {
    const canMoveFocus = () => {
      if (value.length === 0) {
        return true;
      }
      if (experiment('FOCUS_TOKENS_WITH_FILTER', 'PREVENT')) {
        return false;
      }
      if (focusedIndex > -1) {
        return true;
      }
      const norepeat =
        !experiment('FOCUS_TOKENS_WITH_FILTER', 'ALLOW_BUT_PREVENT_REPEAT') ||
        !evt.repeat;
      const { selectionEnd, selectionStart } = evt.currentTarget;
      const outofbounds =
        (evt.key === 'ArrowLeft' && selectionStart === 0) ||
        (evt.key === 'ArrowRight' && selectionEnd === value.length);
      return norepeat && outofbounds;
    };

    if (canMoveFocus()) {
      evt.preventDefault();
      dispatch(moveFocus({ delta }));
    }

    //

    // const allow = !experiment('FOCUS_TOKENS_WITH_FILTER', 'PREVENT');
    // const norepeat =
    //   !evt.repeat ||
    //   !experiment('FOCUS_TOKENS_WITH_FILTER', 'ALLOW_BUT_PREVENT_REPEAT');

    // const { selectionEnd, selectionStart } = evt.currentTarget;
    // const outofbounds =
    //   (evt.key === 'ArrowLeft' && selectionStart === 0) ||
    //   (evt.key === 'ArrowRight' && selectionEnd === value.length);

    // if (
    //   value.length === 0 ||
    //   // ↓ PREVENT flag off
    //   (allow && (focusedIndex > -1 || (norepeat && outofbounds)))
    // ) {
    //   evt.preventDefault();
    //   dispatch(moveFocus(delta));
    // }
  };

  const handleBackspace = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.repeat || value.length > 0) {
      return;
    }

    const delta = focusedIndex > -1 ? 0 : evt.key === 'Delete' ? 1 : -1;
    dispatch(remove({ delta }));
  };

  const handleEnter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (focusedIndex !== -1) {
      dispatch(remove({ index: focusedIndex }));
    } else if (evt.shiftKey) {
      onSubmit(tokens as readonly T[]);
    } else {
      onSelect();
    }
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
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
      <TextValue
        aria-hidden="true"
        ref={valueRef}
        style={{
          opacity: focusedIndex === -1 ? '0' : '1',
        }}
      >
        {value}
      </TextValue>
      <TextInput
        aria-label="TODO: maybe require a `label` prop?"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onBlur={handleBlur}
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
