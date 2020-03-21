import * as React from 'react';
import styled from 'styled-components';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { PromptMessage } from '../../components/PromptMessage';
import { PromptProgress } from '../../components/PromptProgress';
import { Resolvables } from '../../components/Resolvables';
import { usePromptContext } from '../../contexts/prompt';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';

import { ConfirmButtonNo, ConfirmButtonYes } from './ConfirmButton';
import {
  ConfirmPromptContainer,
  ConfirmPromptContainerProps,
  ConfirmPromptContainerReady,
} from './ConfirmPromptContainer';
import { ConfirmPromptContextProvider } from './context';

const ButtonGroup = styled.div`
  box-sizing: border-box;
  padding: 4px;
`;

const identity = <I, O>(x: I): O => (x as unknown) as O;

export interface ConfirmProps<In, Out> extends PromptProps<boolean, In, Out> {
  as?: ConfirmPromptContainerProps['as'];
  initialValue?: Resolvable<boolean, [In]>;
  message?: Resolvable<string, [In]>;
  render?: Resolvable<React.ReactNode, [In]>;
  renderError?(error: Error): React.ReactNode;
  renderProgress?(): React.ReactNode;
}

interface ConfirmComponent {
  <In, Out>(props: ConfirmProps<In, Out>): React.ReactElement | null;
}

export const Confirm: ConfirmComponent = ({
  as,
  initialValue,
  message,
  render,
  renderError,
  renderProgress,
  resolve = identity,
}) => {
  const { onCommit, value } = usePromptContext();

  const handleSubmit = React.useCallback(
    (confirmed: boolean) => {
      const result = call(resolve, confirmed, value);
      onCommit(result);
    },
    [onCommit, resolve, value],
  );

  return (
    <ErrorBoundary
      fallback={error => (
        <ConfirmPromptContainer as={as}>
          {renderError?.(error) ?? (
            <PromptMessage>{error.message}</PromptMessage>
          )}
        </ConfirmPromptContainer>
      )}
    >
      <Resolvables
        fallback={() => (
          <ConfirmPromptContainer as={as}>
            {renderProgress?.() ?? <PromptProgress />}
          </ConfirmPromptContainer>
        )}
        input={value}
        resolvables={{
          initialValue,
          message,
          render,
        }}
      >
        {results => (
          <ConfirmPromptContextProvider
            initialValue={results.initialValue}
            onSubmit={handleSubmit}
          >
            <ConfirmPromptContainerReady as={as}>
              {results.render ?? (
                <>
                  {results.message && (
                    <PromptMessage>{results.message}</PromptMessage>
                  )}
                  <ButtonGroup>
                    <ConfirmButtonYes />
                    <ConfirmButtonNo />
                  </ButtonGroup>
                </>
              )}
            </ConfirmPromptContainerReady>
          </ConfirmPromptContextProvider>
        )}
      </Resolvables>
    </ErrorBoundary>
  );
};
