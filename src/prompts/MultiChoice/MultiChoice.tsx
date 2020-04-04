import * as React from 'react';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { PromptMessage } from '../../components/PromptMessage';
import { Resolvables } from '../../components/Resolvables';
import { Mark } from '../../components/base/Mark';
import { Option } from '../../components/base/Option';
import { Progress } from '../../components/base/Progress';
import { Tokens } from '../../components/base/Token';
import { TokenField } from '../../components/base/TokenField';
import { usePromptContext } from '../../contexts/prompt';
import { Choice } from '../../types/Choice';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';

import { MultiChoicePromptCheckbox } from './MultiChoicePromptCheckbox';
import {
  MultiChoicePromptContainer,
  MultiChoicePromptContainerProps,
} from './MultiChoicePromptContainer';
import { MultiChoicePromptFilter } from './MultiChoicePromptFilter';
import { MultiChoicePromptList } from './MultiChoicePromptList';
import { MultiChoicePromptSubmit } from './MultiChoicePromptSubmit';
import { NoteContainer, Note } from './Note';
import { MultiChoicePromptContextProvider } from './context';

const identity = <I, O>(x: I): O => (x as unknown) as O;

export interface MultiChoiceProps<V, In, Out>
  extends PromptProps<V[], In, Out> {
  as?: MultiChoicePromptContainerProps['as'];
  choices: Resolvable<readonly Choice<V, In>[], [In]>;
  message?: Resolvable<string, [In]>;
  render?: Resolvable<React.ReactNode, [In]>;
  renderError?(error: Error): React.ReactNode;
  renderProgress?(): React.ReactNode;
}

interface MultiChoiceComponent {
  <V, In, Out>(props: MultiChoiceProps<V, In, Out>): React.ReactElement | null;
}

export const MultiChoice: MultiChoiceComponent = <V, In, Out>({
  as,
  choices,
  message,
  render,
  renderError,
  renderProgress,
  resolve = identity,
}: MultiChoiceProps<V, In, Out>): React.ReactElement | null => {
  const { onCommit, value } = usePromptContext();

  const handleSubmit = React.useCallback(
    async (chosen: readonly Choice<V, In>[]) => {
      // TODO: pending
      const choiceResults = await Promise.all(
        chosen.map(choice => call(choice.resolve, value)),
      );
      const result = call(resolve, choiceResults, value);
      onCommit(result);
    },
    [onCommit, resolve, value],
  );

  return (
    <ErrorBoundary
      fallback={error => (
        <MultiChoicePromptContainer as={as}>
          {renderError?.(error) ?? (
            <PromptMessage>{error.message}</PromptMessage>
          )}
        </MultiChoicePromptContainer>
      )}
    >
      <Resolvables
        fallback={() => (
          <MultiChoicePromptContainer as={as}>
            {renderProgress?.() ?? <Progress />}
          </MultiChoicePromptContainer>
        )}
        input={value}
        resolvables={{
          choices,
          message,
          render,
        }}
      >
        {results => (
          <MultiChoicePromptContextProvider
            choices={results.choices}
            onSubmit={handleSubmit}
          >
            <MultiChoicePromptContainer as={as} ready>
              {results.render ?? (
                <>
                  {results.message && (
                    <PromptMessage>
                      {/* TODO: this <Note> shit */}
                      <NoteContainer>
                        {results.message}
                        <Note>
                          (<kbd>Shift</kbd> + <kbd>Enter</kbd> to submit)
                        </Note>
                      </NoteContainer>
                    </PromptMessage>
                  )}
                  <TokenField>
                    <Tokens />
                    <MultiChoicePromptFilter />
                  </TokenField>
                  <MultiChoicePromptList>
                    {({ focused, item, onSelect, selected }) => (
                      <Option
                        id={item.id}
                        label={item.label}
                        onSelect={onSelect}
                        selected={focused}
                      >
                        <MultiChoicePromptCheckbox checked={selected} />
                        <Mark label={item.label} matches={item.matches} />
                      </Option>
                    )}
                  </MultiChoicePromptList>
                </>
              )}
            </MultiChoicePromptContainer>
          </MultiChoicePromptContextProvider>
        )}
      </Resolvables>
    </ErrorBoundary>
  );
};
