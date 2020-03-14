import * as React from 'react';
import { useResolved } from 'use-resolved';

import { ChoiceMenuList } from '../../components/ChoiceMenuList';
import { CmdContainer } from '../../components/CmdContainer';
import { CmdHighlighted } from '../../components/CmdHighlighted';
import { CmdListItem } from '../../components/CmdListItem';
import { CmdMessage } from '../../components/CmdMessage';
import { CmdProgress } from '../../components/CmdProgress';
import { useComponents } from '../../contexts/components';
import { ListProvider } from '../../contexts/list';
import { usePaletteContext } from '../../contexts/palette';
import { usePromptContext } from '../../contexts/prompt';
import { Choice } from '../../types/Choice';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';
import { useHotkeys } from '../../utils/useHotKeys';

import { ChoiceContainer } from './ChoiceContainer';
import { ListSearch } from './ListSearch';

export interface SingleChoiceProps<V, In, Out> extends PromptProps<V, In, Out> {
  choices: Resolvable<readonly Choice<V, In>[], [In]>;
  message?: Resolvable<string, [In]>;
}

interface SingleChoiceComponent {
  <V, In, Out>(props: SingleChoiceProps<V, In, Out>): React.ReactElement | null;
}

const identity = <I, O>(x: I): O => (x as unknown) as O;

export const SingleChoice: SingleChoiceComponent = <V, In, Out>({
  choices,
  message,
  resolve = identity,
}: SingleChoiceProps<V, In, Out>): React.ReactElement | null => {
  const components = useComponents();
  const { state } = usePaletteContext();
  const { onCommit, onExit, value } = usePromptContext();

  useHotkeys('escape', onExit);

  const handleSelect = React.useCallback(
    async (choice: Choice<unknown, unknown>) => {
      // TODO: remove -- this check should be done in the callers (see multi-choice)
      if (choice == null) {
        return;
      }

      // TODO: pending
      const choiceResult = await call(choice.resolve, value);
      const result = call(resolve, choiceResult as V, value);
      onCommit(result);
    },
    [onCommit, resolve, value],
  );

  const choicesResult = useResolved(() => call(choices, value), [
    choices,
    value,
  ]);

  const messageResult = useResolved(() => call(message, value), [
    message,
    value,
  ]);

  return choicesResult.error || messageResult.error ? (
    <>uh oh... {console.warn(choicesResult.error || messageResult.error)}</>
  ) : state.isPending || choicesResult.pending || messageResult.pending ? (
    <CmdContainer as={components.Surround} onOutsideClick={onExit}>
      <CmdProgress as={components.Progress} />
    </CmdContainer>
  ) : (
    <ListProvider items={choicesResult.value}>
      <ChoiceContainer
        as={components.Surround}
        onOutsideClick={onExit}
        onSelect={handleSelect}
      >
        {messageResult.value && (
          <CmdMessage as={components.Message}>{messageResult.value}</CmdMessage>
        )}
        <ListSearch as={components.Input} />
        <ChoiceMenuList as={components.List} onSelect={handleSelect}>
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
        </ChoiceMenuList>
      </ChoiceContainer>
    </ListProvider>
  );
};
