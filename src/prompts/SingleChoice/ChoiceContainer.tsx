import * as React from 'react';

import { CmdContainer } from '../../components/CmdContainer';
import { moveFocus, useListContext } from '../../contexts/list';
import { ChoiceListItem } from '../../types/Choice';

export interface ChoiceContainerProps {
  as?: React.ComponentType<{}>;
  children?: React.ReactNode;
  onOutsideClick(): void;
  onSelect(item: ChoiceListItem, index: number): void;
}

export const ChoiceContainer: React.FC<ChoiceContainerProps> = ({
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
