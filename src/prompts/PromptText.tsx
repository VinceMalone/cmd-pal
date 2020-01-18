import * as React from 'react';
import * as tb from 'ts-toolbelt';

import { CmdContainer } from '../components/CmdContainer';
import { CmdInput } from '../components/CmdInput';
import { CmdProgress } from '../components/CmdProgress';
import { useComponents } from '../contexts/components';
import { usePaletteContext } from '../contexts/palette';
import { usePromptContext } from '../contexts/prompt';
import { useAutoFocus } from '../utils/useAutoFocus';
import { useHotkeys } from '../utils/useHotkeys';
import { useCalled, useResolved } from '../utils/useResolved';

type InitialValue<T> = string | tb.F.Function<[T], tb.M.Promisable<string>>;

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

  const initialValuePromise = useResolved(
    useCalled(initialValue, value),
    undefined,
  );

  useHotkeys('escape', onExit);
  useAutoFocus(inputRef, !initialValuePromise.pending);

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
      {state.isPending || initialValuePromise.pending ? (
        <CmdProgress as={components.Progress} />
      ) : (
        <CmdInput
          as={components.Input}
          defaultValue={initialValuePromise.result}
          label={label}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          ref={inputRef}
        />
      )}
    </CmdContainer>
  );
};
