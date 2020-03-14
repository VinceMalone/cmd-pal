import * as React from 'react';
import styled from 'styled-components';
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

import { ConfirmButtonNo, ConfirmButtonYes } from './ConfirmButton';
import { ConfirmContainer, ConfirmContainerReady } from './ConfirmContainer';
import { ConfirmPromptContextProvider } from './context';

const ButtonGroup = styled.div`
  box-sizing: border-box;
  padding: 4px;
`;

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

export interface ConfirmProps<In, Out> extends PromptProps<boolean, In, Out> {
  as?: React.ComponentType<{}>;
  initialValue?: Resolvable<boolean, [In]>;
  message?: Resolvable<string, [In]>;
  render?: Resolvable<React.ReactNode, [In]>;
  renderError?: ((error: Error) => React.ReactNode) | React.ReactNode;
  renderProgress?: React.ReactNode;
}

interface ConfirmComponent {
  <In, Out>(props: ConfirmProps<In, Out>): React.ReactElement | null;
}

export const Confirm: ConfirmComponent = ({
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
    (confirmed: boolean) => {
      const result = call(resolve, confirmed, value);
      onCommit(result);
    },
    [onCommit, resolve, value],
  );

  return (
    <>
      {error ? (
        <ConfirmContainer as={As ?? components.Surround}>
          {// (() => { throw new Error(error); })()
          typeof renderError === 'function'
            ? renderError(error)
            : renderError ?? (
                <CmdMessage as={components.Message}>{error.message}</CmdMessage>
              )}
        </ConfirmContainer>
      ) : isPending ? (
        <ConfirmContainer as={As ?? components.Surround}>
          {renderProgress ?? <CmdProgress as={components.Progress} />}
        </ConfirmContainer>
      ) : (
        <ConfirmPromptContextProvider
          initialValue={values.initialValue}
          onSubmit={handleSubmit}
        >
          <ConfirmContainerReady as={As ?? components.Surround}>
            {values.render ?? (
              <>
                {values.message && (
                  <CmdMessage as={components.Message}>
                    {values.message}
                  </CmdMessage>
                )}
                <ButtonGroup>
                  <ConfirmButtonYes />
                  <ConfirmButtonNo />
                </ButtonGroup>
              </>
            )}
          </ConfirmContainerReady>
        </ConfirmPromptContextProvider>
      )}
    </>
  );
};
