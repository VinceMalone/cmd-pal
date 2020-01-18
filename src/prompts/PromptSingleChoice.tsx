import * as React from 'react';
import * as tb from 'ts-toolbelt';

import {
  ListProvider,
  moveFocus,
  search,
  useListContext,
} from '../contexts/list';
import { Choice, ChoiceListItem, Choices } from '../../typings/List';
import { CmdContainer } from '../components/CmdContainer';
import { CmdHighlighted } from '../components/CmdHighlighted';
import { CmdInput } from '../components/CmdInput';
import { CmdList } from '../components/CmdList';
import { CmdListItem } from '../components/CmdListItem';
import { CmdProgress } from '../components/CmdProgress';
import { useComponents } from '../contexts/components';
import { usePaletteContext } from '../contexts/palette';
import { usePromptContext } from '../contexts/prompt';
import { useAutoFocus } from '../utils/useAutoFocus';
import { useHotkeys } from '../utils/useHotkeys';
import { useCalled, useResolved } from '../utils/useResolved';

interface PromptProps<V, In, Out> {
  resolve(value: V, input: In): tb.M.Promisable<Out>;
}

export interface PromptSingleChoiceProps<In, Out>
  extends PromptProps<string, In, Out> {
  choices: Choices<In>;
  itemHeight: number;
}

interface PromptSingleChoiceComponent {
  <In, Out>(props: PromptSingleChoiceProps<In, Out>): React.ReactElement | null;
}

export const PromptSingleChoice: PromptSingleChoiceComponent = ({
  choices,
  itemHeight,
  resolve,
}) => {
  const components = useComponents();
  const { state } = usePaletteContext();
  const { onCommit, onExit, value } = usePromptContext();

  useHotkeys('escape', onExit);

  const handleSelect = React.useCallback(
    (choice: Choice) => {
      onCommit(resolve(choice.value, value));
    },
    [onCommit, resolve, value],
  );

  const choicesPromise = useResolved(useCalled(choices, value), []);

  return state.isPending || choicesPromise.pending ? (
    <CmdContainer as={components.Surround} onOutsideClick={onExit}>
      <CmdProgress as={components.Progress} />
    </CmdContainer>
  ) : (
    <ListProvider items={choicesPromise.result}>
      <CmdChoiceContainer
        as={components.Surround}
        onOutsideClick={onExit}
        onSelect={handleSelect}
      >
        <CmdSearch as={components.Input} />
        <CmdMenuList
          as={components.List}
          itemHeight={itemHeight}
          onSelect={handleSelect}
        >
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
        </CmdMenuList>
      </CmdChoiceContainer>
    </ListProvider>
  );
};

//

export interface CmdChoiceContainerProps {
  as?: React.ComponentType<{}>;
  children?: React.ReactNode;
  onOutsideClick(): void;
  onSelect(item: ChoiceListItem, index: number): void;
}

const CmdChoiceContainer: React.FC<CmdChoiceContainerProps> = ({
  as,
  children,
  onOutsideClick,
  onSelect,
}) => {
  const { dispatch, state } = useListContext<ChoiceListItem>();

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      switch (evt.key) {
        case 'ArrowDown':
          evt.preventDefault();
          dispatch(moveFocus(1));
          break;
        case 'ArrowUp':
          evt.preventDefault();
          dispatch(moveFocus(-1));
          break;
        case 'Enter':
          onSelect(state.items[state.focusedIndex], state.focusedIndex);
          break;
      }
    },
    [dispatch, onSelect, state.focusedIndex, state.items],
  );

  return (
    <CmdContainer
      as={as}
      onKeyDown={handleKeyDown}
      onOutsideClick={onOutsideClick}
    >
      {children}
    </CmdContainer>
  );
};

//

type InputProps = React.RefAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

export interface CmdSearchProps {
  as?: React.ComponentType<InputProps>;
}

const CmdSearch: React.FC<CmdSearchProps> = ({ as }) => {
  const { dispatch, state } = useListContext();

  const inputRef = React.useRef<HTMLInputElement>(null);
  useAutoFocus(inputRef, true);

  const handleChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(search(evt.target.value));
    },
    [dispatch],
  );

  return (
    <CmdInput
      aria-activedescendant={state.activeDescendant}
      aria-autocomplete="list"
      aria-haspopup="true"
      as={as}
      autoCorrect="off"
      autoCapitalize="off"
      label="Type to narrow down results."
      onChange={handleChange}
      placeholder="Type to narrow down results."
      ref={inputRef}
      role="combobox"
      spellCheck={false}
      value={state.searchQuery}
    />
  );
};

//

export interface CmdMenuListProps {
  as?: React.ComponentType<{}>;
  children: (props: {
    focused: boolean;
    item: ChoiceListItem;
    onSelect(id: string): void;
  }) => React.ReactElement;
  itemHeight: number;
  onSelect(item: ChoiceListItem, index: number): void;
}

const CmdMenuList: React.FC<CmdMenuListProps> = ({
  as,
  children,
  itemHeight,
  onSelect,
}) => {
  const { state } = useListContext<ChoiceListItem>();

  const handleSelect = React.useCallback(
    (index: number) => {
      onSelect(state.items[index], index);
    },
    [onSelect, state.items],
  );

  return (
    <CmdList
      activeDescendant={state.activeDescendant}
      as={as}
      focusedIndex={state.focusedIndex}
      itemHeight={itemHeight}
      items={state.items}
      onSelect={handleSelect}
    >
      {children}
    </CmdList>
  );
};
