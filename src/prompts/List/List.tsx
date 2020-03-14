import * as React from 'react';
import { Result } from 'use-resolved';

import { CmdMessage } from '../../components/CmdMessage';
import { CmdProgress } from '../../components/CmdProgress';
import { useComponents } from '../../contexts/components';
import { usePaletteContext } from '../../contexts/palette';
import { usePromptContext } from '../../contexts/prompt';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';
import { useResult } from '../../utils/useResult';

import {
  ListPromptContainer,
  ListPromptContainerReady,
} from './ListPromptContainer';
import { ListPromptTextInput } from './ListPromptTextInput';
import { ListPromptTokens } from './ListPromptTokens';
import { ListPromptContextProvider } from './context';

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

const identity = <I, O>(x: I): O => (x as unknown) as O;

export interface ListProps<In, Out> extends PromptProps<string[], In, Out> {
  as?: React.ComponentType<{}>;
  initialValue?: Resolvable<readonly string[], [In]>;
  message?: Resolvable<string, [In]>;
  render?: Resolvable<React.ReactNode, [In]>;
  renderError?: ((error: Error) => React.ReactNode) | React.ReactNode;
  renderProgress?: React.ReactNode;
}

interface ListComponent {
  <In, Out>(props: ListProps<In, Out>): React.ReactElement | null;
}

export const List: ListComponent = ({
  as: As,
  initialValue,
  message,
  render,
  renderError,
  renderProgress,
  resolve = identity,
}) => {
  const components = useComponents();
  const { state } = usePaletteContext();
  const { onCommit, value } = usePromptContext();

  const { error, pending, values } = combineResults({
    initialValue: useResult(initialValue, value),
    message: useResult(message, value),
    render: useResult(render, value),
  });

  const isPending = state.isPending || pending;

  const handleSubmit = React.useCallback(
    (list: string[]) => {
      const result = call(resolve, list, value);
      onCommit(result);
    },
    [onCommit, resolve, value],
  );

  return (
    <>
      {error ? (
        <ListPromptContainer as={As ?? components.Surround}>
          {// (() => { throw new Error(error); })()
          typeof renderError === 'function'
            ? renderError(error)
            : renderError ?? (
                <CmdMessage as={components.Message}>{error.message}</CmdMessage>
              )}
        </ListPromptContainer>
      ) : isPending ? (
        <ListPromptContainer as={As ?? components.Surround}>
          {renderProgress ?? <CmdProgress as={components.Progress} />}
        </ListPromptContainer>
      ) : (
        <ListPromptContextProvider
          initialValue={values.initialValue}
          onSubmit={handleSubmit}
        >
          <ListPromptContainerReady as={As ?? components.Surround}>
            {values.render ?? (
              <>
                {values.message && (
                  <CmdMessage as={components.Message}>
                    {values.message}
                  </CmdMessage>
                )}
                <ListPromptTokens />
                <ListPromptTextInput />
              </>
            )}
          </ListPromptContainerReady>
        </ListPromptContextProvider>
      )}
    </>
  );
};
