import * as React from 'react';
import { useWindowSize } from 'react-use';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

import { ListItem } from '../types/List';

interface RenderItemProps<T extends ListItem> {
  focused: boolean;
  item: T;
  onSelect(id: string): void;
}

export interface VirtualItemsProps<T extends ListItem> {
  children: (props: RenderItemProps<T>) => React.ReactElement;
  focusedIndex: number;
  itemHeight: number;
  items: readonly T[];
  onSelect(index: number): void;
}

export const VirtualItems = <T extends ListItem>({
  children,
  focusedIndex,
  itemHeight,
  items,
  onSelect,
}: VirtualItemsProps<T>): React.ReactElement => {
  const virtualListRef = React.useRef<FixedSizeList>(null);

  const windowSize = useWindowSize();
  let maxHeight = windowSize.height / 2;
  maxHeight = maxHeight - (maxHeight % (itemHeight || 1));
  const listHeight = Math.min(maxHeight, items.length * itemHeight);

  const handleSelect = React.useCallback(
    id => {
      const index = items.findIndex(item => item.id === id);
      onSelect(index);
    },
    [items, onSelect],
  );

  return (
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
  );
};
