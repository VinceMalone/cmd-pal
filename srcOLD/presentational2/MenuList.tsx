import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

import { ListItem } from '../../typings';
import { useListContext } from '../list';
import { usePromptContext } from '../prompt';

const List = styled.div`
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
`;

export interface MenuListProps {
  as?: React.ComponentType<{ role: string; tabIndex: number }>;
  children: (props: {
    focused: boolean;
    item: ListItem;
    onSelect(id: string): void;
  }) => React.ReactElement;
  itemHeight: number;
}

export const MenuList: React.FC<MenuListProps> = ({
  as,
  children,
  itemHeight,
}) => {
  const { state } = useListContext();
  const { exec } = usePromptContext();

  const virtualListRef = React.useRef<FixedSizeList>(null);

  React.useLayoutEffect(() => {
    if (virtualListRef.current != null) {
      virtualListRef.current.scrollToItem(state.focusedIndex);
    }
  }, [state.focusedIndex]);

  const handleSelect = React.useCallback(
    id => {
      const index = state.items.findIndex(item => item.id === id);
      exec(index);
    },
    [exec, state.items],
  );

  // TODO: 66 is the computed height of everything but the list
  // TODO: this should update on window resize
  const maxHeight = window.innerHeight - 64 - 66;

  const listHeight = React.useMemo(
    () => Math.min(maxHeight, state.items.length * itemHeight),
    [itemHeight, maxHeight, state.items.length],
  );

  // TODO: empty list

  return (
    <List
      aria-activedescendant={state.activeDescendant}
      as={as}
      role="tree"
      tabIndex={0}
    >
      <AutoSizer disableHeight>
        {({ width }) => (
          <FixedSizeList
            height={listHeight}
            itemCount={state.items.length}
            itemSize={itemHeight}
            ref={virtualListRef}
            width={width}
          >
            {({ index, style }) => {
              const item = state.items[index];
              return (
                <div style={style}>
                  {children({
                    focused: index === state.focusedIndex,
                    item,
                    onSelect: handleSelect,
                  })}
                </div>
              );
            }}
          </FixedSizeList>
        )}
      </AutoSizer>
    </List>
  );
};
