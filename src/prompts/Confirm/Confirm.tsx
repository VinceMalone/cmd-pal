import * as React from 'react';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Resolvables } from '../../components/Resolvables';
import { ErrorMessage } from '../../components/base/ErrorMessage';
import { Header } from '../../components/base/Header';
import { Message } from '../../components/base/Message';
import { Progress } from '../../components/base/Progress';
import { usePromptContext } from '../../contexts/prompt';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';

import { ConfirmButtonNo, ConfirmButtonYes } from './ConfirmPromptButton';
import { ConfirmPromptButtonGroup } from './ConfirmPromptButtonGroup';
import {
  ConfirmPromptDialog,
  ConfirmPromptDialogProps,
} from './ConfirmPromptDialog';
import { ConfirmPromptContextProvider } from './context';

const identity = <I, O>(x: I): O => (x as unknown) as O;

export interface ConfirmProps<In, Out>
  extends PromptProps<boolean, In, Out>,
    Pick<ConfirmPromptDialogProps, 'as'> {
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
        <ConfirmPromptDialog as={as}>
          {renderError?.(error) ?? <ErrorMessage>{error.message}</ErrorMessage>}
        </ConfirmPromptDialog>
      )}
    >
      <Resolvables
        fallback={() => (
          <ConfirmPromptDialog as={as}>
            {renderProgress?.() ?? <Progress />}
          </ConfirmPromptDialog>
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
            <ConfirmPromptDialog as={as} ready>
              {results.render ?? (
                <>
                  <Header>
                    {results.message && <Message>{results.message}</Message>}
                  </Header>
                  <ConfirmPromptButtonGroup>
                    <ConfirmButtonYes /> <ConfirmButtonNo />
                  </ConfirmPromptButtonGroup>
                </>
              )}
            </ConfirmPromptDialog>
          </ConfirmPromptContextProvider>
        )}
      </Resolvables>
    </ErrorBoundary>
  );
};
