import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

import { ListItem } from '../../typings/List';

const List = styled.div`
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
`;

export interface CmdListProps<T extends ListItem> {
  activeDescendant: string | undefined;
  as?: React.ComponentType<{ role?: string; tabIndex?: number }>;
  children: (props: {
    focused: boolean;
    item: T;
    onSelect(id: string): void;
  }) => React.ReactElement;
  focusedIndex: number;
  itemHeight: number;
  items: readonly T[];
  onSelect(index: number): void;
}

interface CmdListComponent {
  <T extends ListItem>(props: CmdListProps<T>): React.ReactElement | null;
}

export const CmdList: CmdListComponent = ({
  activeDescendant,
  as,
  children,
  focusedIndex,
  itemHeight,
  items,
  onSelect,
}) => {
  const virtualListRef = React.useRef<FixedSizeList>(null);

  React.useLayoutEffect(() => {
    if (virtualListRef.current != null) {
      virtualListRef.current.scrollToItem(focusedIndex);
    }
  }, [focusedIndex]);

  const handleSelect = React.useCallback(
    id => {
      const index = items.findIndex(item => item.id === id);
      onSelect(index);
    },
    [items, onSelect],
  );

  // TODO: 66 is the computed height of everything but the list
  // TODO: this should update on window resize
  const maxHeight = window.innerHeight - 64 - 66;

  const listHeight = React.useMemo(
    () => Math.min(maxHeight, items.length * itemHeight),
    [itemHeight, items.length, maxHeight],
  );

  // TODO: empty list

  return (
    <List
      aria-activedescendant={activeDescendant}
      as={as}
      role="tree"
      tabIndex={0}
    >
      <AutoSizer disableHeight>
        {({ width }) => (
          <FixedSizeList
            height={listHeight}
            itemCount={items.length}
            itemSize={itemHeight}
            ref={virtualListRef}
            width={width}
          >
            {({ index, style }) => {
              const item = items[index];
              return (
                <div style={style}>
                  {children({
                    focused: index === focusedIndex,
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
