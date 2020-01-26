import * as React from 'react';
import * as tb from 'ts-toolbelt';
import { useResolved } from 'use-resolved';

import { Functionable } from '../../typings/Functionable';
import { CmdContainer } from '../components/CmdContainer';
import { CmdInput } from '../components/CmdInput';
import { CmdProgress } from '../components/CmdProgress';
import { useComponents } from '../contexts/components';
import { usePaletteContext } from '../contexts/palette';
import { usePromptContext } from '../contexts/prompt';
import { call } from '../utils/call';
import { useAutoFocus } from '../utils/useAutoFocus';
import { useHotkeys } from '../utils/useHotkeys';

type InitialValue<T> = Functionable<tb.M.Promisable<string>, [T]>;

interface PromptProps<V, In, Out> {
  resolve(value: V, input: In): tb.M.Promisable<Out>;
}

export interface PromptTextProps<In, Out> extends PromptProps<string, In, Out> {
  initialValue?: InitialValue<In>;
  label: string;
  placeholder?: string;
}

interface PromptTextComponent {
  <In, Out>(props: PromptTextProps<In, Out>): React.ReactElement | null;
}

export const PromptText: PromptTextComponent = ({
  initialValue,
  label,
  placeholder,
  resolve,
}) => {
  const components = useComponents();
  const { state } = usePaletteContext();
  const { onCommit, onExit, value } = usePromptContext();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const initialValueResult = useResolved(() => call(initialValue, value), [
    initialValue,
    value,
  ]);

  useHotkeys('escape', onExit);
  useAutoFocus(inputRef, !initialValueResult.pending);

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      if (evt.key === 'Enter') {
        onCommit(resolve(inputRef.current?.value ?? '', value));
      }
    },
    [onCommit, resolve, value],
  );

  return (
    <CmdContainer as={components.Surround} onOutsideClick={onExit}>
      {state.isPending || initialValueResult.pending ? (
        <CmdProgress as={components.Progress} />
      ) : (
        <CmdInput
          as={components.Input}
          defaultValue={initialValueResult.value}
          label={label}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          ref={inputRef}
        />
      )}
    </CmdContainer>
  );
};
