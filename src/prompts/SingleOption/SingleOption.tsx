import * as React from 'react';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Resolvables } from '../../components/Resolvables';
import { ErrorMessage } from '../../components/base/ErrorMessage';
import { Header } from '../../components/base/Header';
import { Mark } from '../../components/base/Mark';
import { Message } from '../../components/base/Message';
import { Option } from '../../components/base/Option';
import { Progress } from '../../components/base/Progress';
import { usePromptContext } from '../../contexts/prompt';
import { OptionBag } from '../../types/Option';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';

import {
  SingleOptionPromptDialog,
  SingleOptionPromptDialogProps,
} from './SingleOptionPromptDialog';
import { SingleOptionPromptFilter } from './SingleOptionPromptFilter';
import { SingleOptionPromptList } from './SingleOptionPromptList';
import { SingleOptionPromptContextProvider } from './context';

const identity = <I, O>(x: I): O => (x as unknown) as O;

export interface SingleOptionProps<V, In, Out>
  extends PromptProps<V, In, Out>,
    Pick<SingleOptionPromptDialogProps, 'as'> {
  message?: Resolvable<string, [In]>;
  options: Resolvable<readonly OptionBag<V, In>[], [In]>;
  render?: Resolvable<React.ReactNode, [In]>;
  renderError?(error: Error): React.ReactNode;
  renderProgress?(): React.ReactNode;
}

interface SingleOptionComponent {
  <V, In, Out>(props: SingleOptionProps<V, In, Out>): React.ReactElement | null;
}

export const SingleOption: SingleOptionComponent = <V, In, Out>({
  as,
  message,
  options,
  render,
  renderError,
  renderProgress,
  resolve = identity,
}: SingleOptionProps<V, In, Out>): React.ReactElement | null => {
  const { onCommit, value } = usePromptContext();

  const handleSubmit = React.useCallback(
    async (option: OptionBag<V, In>) => {
      // TODO: pending
      const optionResult = await call(option.resolve, value);
      const result = call(resolve, optionResult, value);
      onCommit(result);
    },
    [onCommit, resolve, value],
  );

  return (
    <ErrorBoundary
      fallback={error => (
        <SingleOptionPromptDialog as={as}>
          {renderError?.(error) ?? <ErrorMessage>{error.message}</ErrorMessage>}
        </SingleOptionPromptDialog>
      )}
    >
      <Resolvables
        fallback={() => (
          <SingleOptionPromptDialog as={as}>
            {renderProgress?.() ?? <Progress />}
          </SingleOptionPromptDialog>
        )}
        input={value}
        resolvables={{
          message,
          options,
          render,
        }}
      >
        {results => (
          <SingleOptionPromptContextProvider
            onSubmit={handleSubmit}
            options={results.options}
          >
            <SingleOptionPromptDialog as={as}>
              {results.render ?? (
                <>
                  <Header>
                    {results.message && <Message>{results.message}</Message>}
                  </Header>
                  <SingleOptionPromptFilter />
                  <SingleOptionPromptList>
                    {({ focused, item, onSelect }) => (
                      <Option
                        id={item.id}
                        label={item.label}
                        onSelect={onSelect}
                        selected={focused}
                      >
                        <Mark label={item.label} matches={item.matches} />
                      </Option>
                    )}
                  </SingleOptionPromptList>
                </>
              )}
            </SingleOptionPromptDialog>
          </SingleOptionPromptContextProvider>
        )}
      </Resolvables>
    </ErrorBoundary>
  );
};
