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
import { OptionBag } from '../../types/Option';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';

import {
  MultiOptionPromptDialog,
  MultiOptionPromptDialogProps,
} from './MultiOptionPromptDialog';
import { MultiOptionPromptFilter } from './MultiOptionPromptFilter';
import { MultiOptionPromptHint } from './MultiOptionPromptHint';
import { MultiOptionPromptList } from './MultiOptionPromptList';
import { MultiOptionPromptOption } from './MultiOptionPromptOption';
import { MultiOptionPromptContextProvider } from './context';

const identity = <I, O>(x: I): O => (x as unknown) as O;

export interface MultiOptionProps<V, In, Out>
  extends PromptProps<V[], In, Out>,
    Pick<MultiOptionPromptDialogProps, 'as'> {
  message?: Resolvable<string, [In]>;
  options: Resolvable<readonly OptionBag<V, In>[], [In]>;
  render?: Resolvable<React.ReactNode, [In]>;
  renderError?(error: Error): React.ReactNode;
  renderProgress?(): React.ReactNode;
}

interface MultiOptionComponent {
  <V, In, Out>(props: MultiOptionProps<V, In, Out>): React.ReactElement | null;
}

export const MultiOption: MultiOptionComponent = <V, In, Out>({
  as,
  message,
  options,
  render,
  renderError,
  renderProgress,
  resolve = identity,
}: MultiOptionProps<V, In, Out>): React.ReactElement | null => {
  const { onCommit, value } = usePromptContext();

  const handleSubmit = React.useCallback(
    async (selected: readonly OptionBag<V, In>[]) => {
      // TODO: pending
      const optionResults = await Promise.all(
        selected.map(option => call(option.resolve, value)),
      );
      const result = call(resolve, optionResults, value);
      onCommit(result);
    },
    [onCommit, resolve, value],
  );

  return (
    <ErrorBoundary
      fallback={error => (
        <MultiOptionPromptDialog as={as}>
          {renderError?.(error) ?? <ErrorMessage>{error.message}</ErrorMessage>}
        </MultiOptionPromptDialog>
      )}
    >
      <Resolvables
        fallback={() => (
          <MultiOptionPromptDialog as={as}>
            {renderProgress?.() ?? <Progress />}
          </MultiOptionPromptDialog>
        )}
        input={value}
        resolvables={{
          message,
          options,
          render,
        }}
      >
        {results => (
          <MultiOptionPromptContextProvider
            onSubmit={handleSubmit}
            options={results.options}
          >
            <MultiOptionPromptDialog as={as} ready>
              {results.render ?? (
                <>
                  <Header>
                    {results.message && <Message>{results.message}</Message>}
                    <MultiOptionPromptHint />
                  </Header>
                  <TokenField>
                    <Tokens />
                    <MultiOptionPromptFilter />
                  </TokenField>
                  <MultiOptionPromptList>
                    {({ focused, item, onSelect, selected }) => (
                      <MultiOptionPromptOption
                        focused={focused}
                        id={item.id}
                        label={item.label}
                        matches={item.matches}
                        onSelect={onSelect}
                        selected={selected}
                      />
                    )}
                  </MultiOptionPromptList>
                </>
              )}
            </MultiOptionPromptDialog>
          </MultiOptionPromptContextProvider>
        )}
      </Resolvables>
    </ErrorBoundary>
  );
};
