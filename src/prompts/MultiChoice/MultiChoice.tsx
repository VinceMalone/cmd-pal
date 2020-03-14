import * as React from 'react';
import { useResolved } from 'use-resolved';

import { CmdContainer } from '../../components/CmdContainer';
import { CmdMessage } from '../../components/CmdMessage';
import { CmdProgress } from '../../components/CmdProgress';
import { useComponents } from '../../contexts/components';
import { ListProvider } from '../../contexts/list';
import { usePaletteContext } from '../../contexts/palette';
import { usePromptContext } from '../../contexts/prompt';
import { TokensProvider } from '../../contexts/tokens';
import { Choice, ChoiceListItem } from '../../types/Choice';
import { PromptProps } from '../../types/PromptProps';
import { Resolvable } from '../../types/Resolvable';
import { call } from '../../utils/call';
import { useHotkeys } from '../../utils/useHotKeys';

import { MultiChoiceContainer } from './MultiChoiceContainer';
import { MultiChoiceListItem } from './MultiChoiceListItem';
import { MultiChoiceMenuList } from './MultiChoiceMenuList';
import { MultiChoiceTokens } from './MultiChoiceTokens';

export interface MultiChoiceProps<V extends unknown[], In, Out>
  extends PromptProps<V, In, Out> {
  choices: Resolvable<readonly Choice<V, In>[], [In]>;
  message?: Resolvable<string, [In]>;
}

interface MultiChoiceComponent {
  <V extends unknown[], In, Out>(
    props: MultiChoiceProps<V, In, Out>,
  ): React.ReactElement | null;
}

const identity = <I, O>(x: I): O => (x as unknown) as O;

export const MultiChoice: MultiChoiceComponent = <
  V extends unknown[],
  In,
  Out
>({
  choices,
  message,
  resolve = identity,
}: MultiChoiceProps<V, In, Out>): React.ReactElement | null => {
  const components = useComponents();
  const { state } = usePaletteContext();
  const { onCommit, onExit, value } = usePromptContext();

  useHotkeys('escape', onExit);

  const handleSubmit = React.useCallback(
    async (selected: ChoiceListItem[]) => {
      // TODO: pending
      const choiceResults = await Promise.all(
        selected.map(choice => call(choice.resolve, value)),
      );
      const result = call(resolve, choiceResults as V, value);
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
      <TokensProvider>
        <MultiChoiceContainer
          as={components.Surround}
          onOutsideClick={onExit}
          onSubmit={handleSubmit}
        >
          {messageResult.value && (
            <CmdMessage as={components.Message}>
              {messageResult.value}
            </CmdMessage>
          )}
          <MultiChoiceTokens />
          <MultiChoiceMenuList as={components.List}>
            {({ focused, item, onSelect }) => (
              <MultiChoiceListItem
                focused={focused}
                item={item}
                onSelect={onSelect}
              />
            )}
          </MultiChoiceMenuList>
        </MultiChoiceContainer>
      </TokensProvider>
    </ListProvider>
  );
};
