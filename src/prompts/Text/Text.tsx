import * as React from 'react';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { PromptMessage } from '../../components/PromptMessage';
import { PromptProgress } from '../../components/PromptProgress';
import { Resolvables } from '../../components/Resolvables';
import { usePromptContext } from '../../contexts/prompt';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';

import {
  TextPromptContainer,
  TextPromptContainerProps,
} from './TextPromptContainer';
import { TextPromptTextInput } from './TextPromptTextInput';
import { TextPromptContextProvider } from './context';

const identity = <I, O>(x: I): O => (x as unknown) as O;

export interface TextProps<In, Out> extends PromptProps<string, In, Out> {
  as?: TextPromptContainerProps['as'];
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
        <TextPromptContainer as={as}>
          {renderError?.(error) ?? (
            <PromptMessage>{error.message}</PromptMessage>
          )}
        </TextPromptContainer>
      )}
    >
      <Resolvables
        fallback={() => (
          <TextPromptContainer as={as}>
            {renderProgress?.() ?? <PromptProgress />}
          </TextPromptContainer>
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
            <TextPromptContainer as={as}>
              {render ?? (
                <>
                  {results.message && (
                    <PromptMessage>{results.message}</PromptMessage>
                  )}
                  <TextPromptTextInput />
                </>
              )}
            </TextPromptContainer>
          </TextPromptContextProvider>
        )}
      </Resolvables>
    </ErrorBoundary>
  );
};
