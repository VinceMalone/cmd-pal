import * as React from 'react';

import { useExperiments } from '../../components/Experiments';
import { usePromptContext } from '../../contexts/prompt';
import {
  clear,
  moveFocus,
  remove,
  unfocus,
  useTokensContext,
} from '../../contexts/tokens';
import { Token } from '../../types/Token';

// ```ts
// const focused = useFocusContext('input'); // TODO: "Visible _submit button_" experiment
// ```

// ```ts
// const inputRef = React.useRef<HTMLInputElement>(null);
// useAutoFocus(inputRef, true);
// ```

const noop = () => undefined;

const useSelectAllOnTab = (inputRef: React.RefObject<HTMLInputElement>) => {
  const { state } = useTokensContext();
  const { focusedIndex } = state;

  const justTabbedRef = React.useRef(false);

  React.useLayoutEffect(() => {
    const input = inputRef.current;
    const justTabbed = justTabbedRef.current;
    justTabbedRef.current = false;

    if (focusedIndex === -1 && justTabbed && input !== null) {
      input.setSelectionRange(0, 10);
    }
  }, [focusedIndex, inputRef]);

  return React.useCallback(() => {
    justTabbedRef.current = true;
  }, []);
};

interface Props {
  onArrowDown?(evt: React.KeyboardEvent<HTMLElement>): void;
  onArrowUp?(evt: React.KeyboardEvent<HTMLElement>): void;
  onChange(value: string): void;
  onPageDown?(evt: React.KeyboardEvent<HTMLElement>): void;
  onPageUp?(evt: React.KeyboardEvent<HTMLElement>): void;
  onSelect(): void;
  onSubmit(tokens: readonly Token[]): void;
  value: string;
}

export const useTextboxTokenProps = (
  {
    onArrowDown = noop,
    onArrowUp = noop,
    onChange,
    onPageDown = noop,
    onPageUp = noop,
    onSelect,
    onSubmit,
    value,
  }: Props,
  inputRef: React.RefObject<HTMLInputElement>,
) => {
  const { experiment } = useExperiments();
  const { onExit } = usePromptContext();
  const { dispatch, state } = useTokensContext();
  const { focusedIndex, tokens } = state;

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
      const { selectionEnd, selectionStart } = evt.currentTarget;
      if (selectionStart !== selectionEnd) {
        return false;
      }
      const outofbounds =
        (evt.key === 'ArrowLeft' && selectionStart === 0) ||
        (evt.key === 'ArrowRight' && selectionEnd === value.length);
      const norepeat =
        !experiment('FOCUS_TOKENS_WITH_FILTER', 'ALLOW_BUT_PREVENT_REPEAT') ||
        !evt.repeat;
      return outofbounds && norepeat;
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
    } else if (evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey) {
      if (
        (experiment('SUBMIT_MODIFIER', '⇧') && evt.shiftKey) ||
        (experiment('SUBMIT_MODIFIER', '⌃') && evt.ctrlKey) ||
        (experiment('SUBMIT_MODIFIER', '⌥') && evt.altKey) ||
        (experiment('SUBMIT_MODIFIER', '⌘') && evt.metaKey)
      ) {
        onSubmit(tokens);
      }
    } else {
      onSelect();
    }
  };

  const handleEscape = () => {
    if (experiment('ON_ESCAPE', 'CLOSE')) {
      onExit();
    } else if (experiment('ON_ESCAPE', 'CLEAR_ALL > CLOSE')) {
      if (value.length > 0 || tokens.length > 0) {
        onChange('');
        dispatch(clear());
      } else {
        onExit();
      }
    } else if (experiment('ON_ESCAPE', 'CLEAR_FILTER > CLOSE')) {
      if (value.length > 0) {
        onChange('');
      } else {
        onExit();
      }
    } else if (experiment('ON_ESCAPE', 'CLEAR_FILTER > CLEAR_TOKENS > CLOSE')) {
      if (value.length > 0) {
        onChange('');
      } else if (tokens.length > 0) {
        dispatch(clear());
      } else {
        onExit();
      }
    }
  };

  const onTab = useSelectAllOnTab(inputRef);
  const handleTab = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    evt.preventDefault();
    onTab();

    const delta = evt.shiftKey ? -1 : 1;
    dispatch(moveFocus({ delta }));
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
      case 'PageDown':
        return onPageDown(evt);
      case 'PageUp':
        return onPageUp(evt);
      case 'Backspace':
      case 'Delete':
        return handleBackspace(evt);
      case 'Enter':
        return handleEnter(evt);
      case 'Escape':
        return handleEscape();
      case 'Tab':
        return handleTab(evt);
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt.target.value);
    if (focusedIndex > -1) {
      dispatch(unfocus());
    }
  };

  // TODO: handle _don't unfocus_
  // ... this sucks (and probably breaks things)
  const handleBlur = () => {
    setTimeout(() => {
      if (inputRef.current != null) {
        inputRef.current.focus();
      }
    }, 1);
  };

  return {
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onChange: handleChange,
  };
};
