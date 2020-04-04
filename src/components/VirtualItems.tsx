import * as React from 'react';
import { useWindowSize } from 'react-use';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

interface RenderItemProps {
  index: number;
}

export interface VirtualItemsProps {
  children: (props: RenderItemProps) => React.ReactElement;
  itemCount: number;
  itemHeight: number;
}

export interface VirtualItemsRef {
  itemHeight: number;
  listHeight: number;
  scrollOffset: number;
  scrollToItem?(index: number): void;
}

export const VirtualItems = React.forwardRef<
  VirtualItemsRef,
  VirtualItemsProps
>(({ children, itemCount, itemHeight }, forwardedRef) => {
  const virtualListRef = React.useRef<FixedSizeList>(null);
  const ref = React.useRef<VirtualItemsRef>({
    itemHeight: 0,
    listHeight: 0,
    scrollOffset: 0,
  });

  const windowSize = useWindowSize();
  let maxHeight = windowSize.height / 2;
  maxHeight = maxHeight - (maxHeight % (itemHeight || 1));
  const listHeight = Math.min(maxHeight, itemCount * itemHeight);

  ref.current.itemHeight = itemHeight;
  ref.current.listHeight = listHeight;
  ref.current.scrollToItem = (index: number) => {
    virtualListRef.current?.scrollToItem(index);
  };

  React.useImperativeHandle(forwardedRef, () => ref.current);

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <FixedSizeList
          height={listHeight}
          itemCount={itemCount}
          itemSize={itemHeight}
          onScroll={({ scrollOffset }) => {
            ref.current.scrollOffset = scrollOffset;
          }}
          ref={virtualListRef}
          width={width}
        >
          {({ index, style }) => <div style={style}>{children({ index })}</div>}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
});

VirtualItems.displayName = 'VirtualItems';
