import * as React from 'react';
import { Result } from 'use-resolved';

import { CmdContainer } from '../../components/CmdContainer';
import { CmdInput } from '../../components/CmdInput';
import { CmdMessage } from '../../components/CmdMessage';
import { CmdProgress } from '../../components/CmdProgress';
import { useComponents } from '../../contexts/components';
import { usePaletteContext } from '../../contexts/palette';
import { usePromptContext } from '../../contexts/prompt';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';
import { useAutoFocus } from '../../utils/useAutoFocus';
import { useHotkeys } from '../../utils/useHotKeys';
import { useResult } from '../../utils/useResult';

const identity = <I, O>(x: I): O => (x as unknown) as O;

const combineResults = <T extends Record<string, unknown>>(
  results: { [P in keyof T]: Result<T[P]> },
) => {
  const entries = Object.entries(results);

  return {
    error: entries.find(([, x]) => x.error)?.[1]?.error,
    pending: entries.some(([, x]) => x.pending),
    values: Object.fromEntries(entries.map(([k, v]) => [k, v.value])) as T,
  };
};

export interface TextProps<In, Out> extends PromptProps<string, In, Out> {
  initialValue?: Resolvable<string, [In]>;
  message: Resolvable<string, [In]>;
  placeholder?: Resolvable<string, [In]>;
}

interface TextComponent {
  <In, Out>(props: TextProps<In, Out>): React.ReactElement | null;
}

export const Text: TextComponent = ({
  initialValue,
  message,
  placeholder,
  resolve = identity,
}) => {
  const components = useComponents();
  const { state } = usePaletteContext();
  const { onCommit, onExit, value } = usePromptContext();

  const { error, pending, values } = combineResults({
    initialValue: useResult(initialValue, value),
    message: useResult(message, value),
    placeholder: useResult(placeholder, value),
  });

  const isPending = state.isPending || pending;

  useHotkeys('escape', onExit);

  const inputRef = React.useRef<HTMLInputElement>(null);
  useAutoFocus(inputRef, !error && !isPending);

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      if (evt.key === 'Enter') {
        const result = call(resolve, inputRef.current?.value ?? '', value);
        onCommit(result);
      }
    },
    [onCommit, resolve, value],
  );

  return (
    <CmdContainer as={components.Surround} onOutsideClick={onExit}>
      {error ? (
        <CmdMessage as={components.Message}>{error.message}</CmdMessage>
      ) : isPending ? (
        <CmdProgress as={components.Progress} />
      ) : (
        <>
          {message && (
            <CmdMessage as={components.Message}>{values.message}</CmdMessage>
          )}
          <CmdInput
            as={components.Input}
            defaultValue={values.initialValue}
            label={values.message}
            onKeyDown={handleKeyDown}
            placeholder={values.placeholder}
            ref={inputRef}
          />
        </>
      )}
    </CmdContainer>
  );
};
