import * as React from 'react';

import { CmdContainer } from '../../components/CmdContainer';
import * as list from '../../contexts/list';
import * as tokens from '../../contexts/tokens';
import { ChoiceListItem } from '../../types/Choice';
import { Token } from '../../types/Token';

// TODO: BUG: shouldn't be able to _move list focus_ when it's empty

const useMoveListItemFocus = () => {
  const { dispatch } = list.useListContext<ChoiceListItem>();
  const { state } = tokens.useTokensContext();

  return React.useCallback(
    (delta: number, evt: React.KeyboardEvent<HTMLElement>) => {
      evt.preventDefault(); // TODO: always?
      if (state.focusedIndex === -1) {
        dispatch(list.moveFocus(delta));
      }
    },
    [dispatch, state.focusedIndex],
  );
};

const useMoveTokenFocus = () => {
  const { state } = list.useListContext<ChoiceListItem>();
  const { dispatch } = tokens.useTokensContext();

  return React.useCallback(
    (delta: number, evt: React.KeyboardEvent<HTMLElement>) => {
      if (state.searchQuery.length === 0) {
        evt.preventDefault();
        dispatch(tokens.moveFocus(delta));
      }
    },
    [dispatch, state.searchQuery],
  );
};

const useRemoveToken = () => {
  const { dispatch, state } = tokens.useTokensContext();

  return React.useCallback(() => {
    dispatch(tokens.removeAtIndex(state.focusedIndex));
  }, [dispatch, state.focusedIndex]);
};

const useSelectListItem = () => {
  const { state } = list.useListContext<ChoiceListItem>();
  const { dispatch } = tokens.useTokensContext();
  const focusedItem = state.items[state.focusedIndex];

  return React.useCallback(() => {
    if (focusedItem !== undefined) {
      dispatch(tokens.toggle(focusedItem));
    }
  }, [dispatch, focusedItem]);
};

const useSubmit = (handleSubmit: (selected: readonly Token[]) => void) => {
  const { state } = tokens.useTokensContext();

  return React.useCallback(() => {
    handleSubmit(state.tokens);
  }, [handleSubmit, state.tokens]);
};

const useTokenFocused = () => {
  const { state } = tokens.useTokensContext();
  return state.focusedIndex !== -1;
};

// TODO: rename and _make better_
const useRemoveTokenFrom = () => {
  const { state } = list.useListContext<ChoiceListItem>();
  const { dispatch, state: tokenState } = tokens.useTokensContext();

  return React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      if (evt.repeat || state.searchQuery.length > 0) {
        return;
      }

      const delta =
        tokenState.focusedIndex > -1 ? 0 : evt.key === 'Delete' ? 1 : -1;
      dispatch(tokens.removeAtOffset(delta));
    },
    [dispatch, state.searchQuery, tokenState.focusedIndex],
  );
};

export interface MultiChoiceContainerProps {
  as?: React.ComponentType<{}>;
  children?: React.ReactNode;
  onOutsideClick(): void;
  onSubmit(selected: readonly Token[]): void;
}

export const MultiChoiceContainer: React.FC<MultiChoiceContainerProps> = ({
  as,
  children,
  onOutsideClick,
  onSubmit,
}) => {
  const submit = useSubmit(onSubmit);
  const moveListItemFocus = useMoveListItemFocus();
  const moveTokenFocus = useMoveTokenFocus();
  const removeToken = useRemoveToken();
  const selectListItem = useSelectListItem();
  const tokenFocused = useTokenFocused();

  const handleBackspace = useRemoveTokenFrom();

  const handleEnter = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      if (tokenFocused) {
        removeToken();
      } else if (evt.shiftKey) {
        submit();
      } else {
        selectListItem();
      }
    },
    [removeToken, selectListItem, submit, tokenFocused],
  );

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      switch (evt.key) {
        case 'ArrowDown':
          return moveListItemFocus(1, evt);
        case 'ArrowUp':
          return moveListItemFocus(-1, evt);
        case 'ArrowLeft':
          return moveTokenFocus(-1, evt);
        case 'ArrowRight':
          return moveTokenFocus(1, evt);
        case 'Backspace':
        case 'Delete':
          return handleBackspace(evt);
        case 'Enter':
          return handleEnter(evt);
      }
    },
    [handleBackspace, handleEnter, moveListItemFocus, moveTokenFocus],
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
