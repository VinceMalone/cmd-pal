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

import { TextPromptDialog, TextPromptDialogProps } from './TextPromptDialog';
import { TextPromptTextbox } from './TextPromptTextbox';
import { TextPromptContextProvider } from './context';

const identity = <I, O>(x: I): O => (x as unknown) as O;

export interface TextProps<In, Out>
  extends PromptProps<string, In, Out>,
    Pick<TextPromptDialogProps, 'as'> {
  initialValue?: Resolvable<string, [In]>;
  message: Resolvable<string, [In]>;
  placeholder?: Resolvable<string, [In]>;
  render?: Resolvable<React.ReactNode, [In]>;
  renderError?(error: Error): React.ReactNode;
  renderProgress?(): React.ReactNode;
}

interface TextComponent {
  <In, Out>(props: TextProps<In, Out>): React.ReactElement | null;
}

export const Text: TextComponent = ({
  as,
  initialValue,
  message,
  placeholder,
  render,
  renderError,
  renderProgress,
  resolve = identity,
}) => {
  const { onCommit, value } = usePromptContext();

  const handleSubmit = React.useCallback(
    (text: string) => {
      const result = call(resolve, text, value);
      onCommit(result);
    },
    [onCommit, resolve, value],
  );

  return (
    <ErrorBoundary
      fallback={error => (
        <TextPromptDialog as={as}>
          {renderError?.(error) ?? <ErrorMessage>{error.message}</ErrorMessage>}
        </TextPromptDialog>
      )}
    >
      <Resolvables
        fallback={() => (
          <TextPromptDialog as={as}>
            {renderProgress?.() ?? <Progress />}
          </TextPromptDialog>
        )}
        input={value}
        resolvables={{
          initialValue,
          message,
          placeholder,
          render,
        }}
      >
        {results => (
          <TextPromptContextProvider
            initialValue={results.initialValue}
            message={results.message}
            onSubmit={handleSubmit}
            placeholder={results.placeholder}
          >
            <TextPromptDialog as={as}>
              {render ?? (
                <>
                  <Header>
                    {results.message && <Message>{results.message}</Message>}
                  </Header>
                  <TextPromptTextbox />
                </>
              )}
            </TextPromptDialog>
          </TextPromptContextProvider>
        )}
      </Resolvables>
    </ErrorBoundary>
  );
};
