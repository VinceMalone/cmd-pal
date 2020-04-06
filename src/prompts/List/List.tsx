import * as React from 'react';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Resolvables } from '../../components/Resolvables';
import { ErrorMessage } from '../../components/base/ErrorMessage';
import { Header } from '../../components/base/Header';
import { Message } from '../../components/base/Message';
import { Progress } from '../../components/base/Progress';
import { Tokens } from '../../components/base/Token';
import { TokenField } from '../../components/base/TokenField';
import { usePromptContext } from '../../contexts/prompt';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';

import { ListPromptDialog, ListPromptDialogProps } from './ListPromptDialog';
import { ListPromptTextbox } from './ListPromptTextbox';
import { ListPromptContextProvider } from './context';

const identity = <I, O>(x: I): O => (x as unknown) as O;

export interface ListProps<In, Out>
  extends PromptProps<string[], In, Out>,
    Pick<ListPromptDialogProps, 'as'> {
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
        <ListPromptDialog as={as}>
          {renderError?.(error) ?? <ErrorMessage>{error.message}</ErrorMessage>}
        </ListPromptDialog>
      )}
    >
      <Resolvables
        fallback={() => (
          <ListPromptDialog as={as}>
            {renderProgress?.() ?? <Progress />}
          </ListPromptDialog>
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
            <ListPromptDialog as={as}>
              {render ?? (
                <>
                  <Header>
                    {results.message && <Message>{results.message}</Message>}
                  </Header>
                  <TokenField>
                    <Tokens />
                    <ListPromptTextbox />
                  </TokenField>
                </>
              )}
            </ListPromptDialog>
          </ListPromptContextProvider>
        )}
      </Resolvables>
    </ErrorBoundary>
  );
};
