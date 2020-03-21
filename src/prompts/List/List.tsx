import * as React from 'react';

import { CmdTokenGroup } from '../../components/CmdTokenGroup';
import { DismissibleTokens } from '../../components/DismissibleTokens';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { PromptMessage } from '../../components/PromptMessage';
import { PromptProgress } from '../../components/PromptProgress';
import { Resolvables } from '../../components/Resolvables';
import { useComponents } from '../../contexts/components';
import { usePromptContext } from '../../contexts/prompt';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';

import {
  ListPromptContainer,
  ListPromptContainerProps,
} from './ListPromptContainer';
import { ListPromptTextInput } from './ListPromptTextInput';
import { ListPromptContextProvider } from './context';

const identity = <I, O>(x: I): O => (x as unknown) as O;

export interface ListProps<In, Out> extends PromptProps<string[], In, Out> {
  as?: ListPromptContainerProps['as'];
  initialValue?: Resolvable<readonly string[], [In]>;
  message?: Resolvable<string, [In]>;
  render?: Resolvable<React.ReactNode, [In]>;
  renderError?(error: Error): React.ReactNode;
  renderProgress?(): React.ReactNode;
}

interface ListComponent {
  <In, Out>(props: ListProps<In, Out>): React.ReactElement | null;
}

export const List: ListComponent = ({
  as,
  initialValue,
  message,
  render,
  renderError,
  renderProgress,
  resolve = identity,
}) => {
  const components = useComponents();
  const { onCommit, value } = usePromptContext();

  const handleSubmit = React.useCallback(
    (list: string[]) => {
      const result = call(resolve, list, value);
      onCommit(result);
    },
    [onCommit, resolve, value],
  );

  return (
    <ErrorBoundary
      fallback={error => (
        <ListPromptContainer as={as}>
          {renderError?.(error) ?? (
            <PromptMessage>{error.message}</PromptMessage>
          )}
        </ListPromptContainer>
      )}
    >
      <Resolvables
        fallback={() => (
          <ListPromptContainer as={as}>
            {renderProgress?.() ?? <PromptProgress />}
          </ListPromptContainer>
        )}
        input={value}
        resolvables={{
          initialValue,
          message,
          render,
        }}
      >
        {results => (
          <ListPromptContextProvider
            initialValue={results.initialValue}
            onSubmit={handleSubmit}
          >
            <ListPromptContainer as={as}>
              {render ?? (
                <>
                  {results.message && (
                    <PromptMessage>{results.message}</PromptMessage>
                  )}
                  <CmdTokenGroup as={components.TokenGroup}>
                    <DismissibleTokens as={components.Token} />
                    <ListPromptTextInput />
                  </CmdTokenGroup>
                </>
              )}
            </ListPromptContainer>
          </ListPromptContextProvider>
        )}
      </Resolvables>
    </ErrorBoundary>
  );
};
