import * as React from 'react';
import { useWindowSize } from 'react-use';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

import { ListItem } from '../types/List';

const List = styled.div`
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
`;

export interface CmdListProps<T extends ListItem> {
  activeDescendant: string | undefined;
  as?: React.ComponentType<{
    role?: string;
    // tabIndex?: number; // TODO: needed? (see JSX)
  }>;
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

  const windowSize = useWindowSize();
  let maxHeight = windowSize.height / 2;
  maxHeight = maxHeight - (maxHeight % (itemHeight || 1));
  const listHeight = Math.min(maxHeight, items.length * itemHeight);

  return (
    <List
      aria-activedescendant={activeDescendant}
      as={as}
      role="tree"
      // tabIndex={-1} // TODO: why? because of auto-focus? That's not a problem...
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
