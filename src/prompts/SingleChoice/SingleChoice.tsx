import * as React from 'react';

import { CmdHighlighted } from '../../components/CmdHighlighted';
import { CmdListItem } from '../../components/CmdListItem';
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

import {
  SingleChoicePromptContainer,
  SingleChoicePromptContainerProps,
} from './SingleChoicePromptContainer';
import { SingleChoicePromptList } from './SingleChoicePromptList';
import { SingleChoicePromptSearch } from './SingleChoicePromptSearch';
import { SingleChoicePromptContextProvider } from './context';

const identity = <I, O>(x: I): O => (x as unknown) as O;

export interface SingleChoiceProps<V, In, Out> extends PromptProps<V, In, Out> {
  as?: SingleChoicePromptContainerProps['as'];
  choices: Resolvable<readonly Choice<V, In>[], [In]>;
  message?: Resolvable<string, [In]>;
  render?: Resolvable<React.ReactNode, [In]>;
  renderError?(error: Error): React.ReactNode;
  renderProgress?(): React.ReactNode;
}

interface SingleChoiceComponent {
  <V, In, Out>(props: SingleChoiceProps<V, In, Out>): React.ReactElement | null;
}

export const SingleChoice: SingleChoiceComponent = <V, In, Out>({
  as,
  choices,
  message,
  render,
  renderError,
  renderProgress,
  resolve = identity,
}: SingleChoiceProps<V, In, Out>): React.ReactElement | null => {
  const components = useComponents();
  const { onCommit, value } = usePromptContext();

  const handleSubmit = React.useCallback(
    async (choice: Choice<V, In>) => {
      // TODO: pending
      const choiceResult = await call(choice.resolve, value);
      const result = call(resolve, choiceResult, value);
      onCommit(result);
    },
    [onCommit, resolve, value],
  );

  return (
    <ErrorBoundary
      fallback={error => (
        <SingleChoicePromptContainer as={as}>
          {renderError?.(error) ?? (
            <PromptMessage>{error.message}</PromptMessage>
          )}
        </SingleChoicePromptContainer>
      )}
    >
      <Resolvables
        fallback={() => (
          <SingleChoicePromptContainer as={as}>
            {renderProgress?.() ?? <PromptProgress />}
          </SingleChoicePromptContainer>
        )}
        input={value}
        resolvables={{
          choices,
          message,
          render,
        }}
      >
        {results => (
          <SingleChoicePromptContextProvider
            choices={results.choices}
            onSubmit={handleSubmit}
          >
            <SingleChoicePromptContainer as={as}>
              {results.render ?? (
                <>
                  {results.message && (
                    <PromptMessage>{results.message}</PromptMessage>
                  )}
                  <SingleChoicePromptSearch />
                  <SingleChoicePromptList>
                    {({ focused, item, onSelect }) => (
                      <CmdListItem
                        as={components.Option}
                        focused={focused}
                        id={item.id}
                        label={item.label}
                        onSelect={onSelect}
                      >
                        <CmdHighlighted
                          as={components.Mark}
                          label={item.label}
                          matches={item.matches}
                        />
                      </CmdListItem>
                    )}
                  </SingleChoicePromptList>
                </>
              )}
            </SingleChoicePromptContainer>
          </SingleChoicePromptContextProvider>
        )}
      </Resolvables>
    </ErrorBoundary>
  );
};
