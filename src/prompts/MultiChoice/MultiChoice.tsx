import * as React from 'react';

import { CmdHighlighted } from '../../components/CmdHighlighted';
import { CmdListItem } from '../../components/CmdListItem';
import { CmdTokenGroup } from '../../components/CmdTokenGroup';
import { DismissibleTokens } from '../../components/DismissibleTokens';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { PromptMessage } from '../../components/PromptMessage';
import { PromptProgress } from '../../components/PromptProgress';
import { Resolvables } from '../../components/Resolvables';
import { useComponents } from '../../contexts/components';
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
import { MultiChoicePromptList } from './MultiChoicePromptList';
import { MultiChoicePromptSearch } from './MultiChoicePromptSearch';
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
  const components = useComponents();
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
            {renderProgress?.() ?? <PromptProgress />}
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
            <MultiChoicePromptContainer as={as}>
              {results.render ?? (
                <>
                  {results.message && (
                    <PromptMessage>
                      {/* TODO: this <Note> shit */}
                      <NoteContainer>
                        {results.message}
                        <Note>
                          (
                          <span title="Shift + Return">
                            <code>⇧</code> + <code>⏎</code>
                          </span>{' '}
                          to submit)
                        </Note>
                      </NoteContainer>
                    </PromptMessage>
                  )}
                  <CmdTokenGroup as={components.TokenGroup}>
                    <DismissibleTokens as={components.Token} />
                    <MultiChoicePromptSearch />
                  </CmdTokenGroup>
                  <MultiChoicePromptList>
                    {({ focused, item, onSelect, selected }) => (
                      <CmdListItem
                        as={components.Option}
                        focused={focused}
                        id={item.id}
                        label={item.label}
                        onSelect={onSelect}
                      >
                        <MultiChoicePromptCheckbox checked={selected} />
                        <CmdHighlighted
                          as={components.Mark}
                          label={item.label}
                          matches={item.matches}
                        />
                      </CmdListItem>
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
