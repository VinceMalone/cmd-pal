import * as React from 'react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

import { ListItem } from '../../typings/Item';

import { useComponents } from '../util/components';
import { CmdHelpText } from './CmdHelpText';
import { CmdOption } from './CmdOption';

// TODO: move to own file
const useScrollIntoView = (
  parentRef: React.RefObject<HTMLElement>,
  childSelector: string | undefined,
) => {
  useLayoutEffect(() => {
    const parent = parentRef.current;
    if (parent == null || childSelector == null) {
      return;
    }

    const child = parent.querySelector(childSelector) as HTMLElement;
    if (child == null) {
      return;
    }

    const childBottom = child.offsetTop + child.clientHeight;
    const parentBottom = parent.scrollTop + parent.clientHeight;

    if (childBottom > parentBottom) {
      // TODO: add 8px buffer? Or handle with changing padding-bottom to margin-bottom
      parent.scrollTop = childBottom - parent.clientHeight;
    } else if (child.offsetTop < parent.scrollTop) {
      parent.scrollTop = child.offsetTop;
    }
  }, [childSelector, parentRef]);
};

const List = styled.div`
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
`;

type ElementProps = JSX.IntrinsicElements['div'];

export interface CmdListProps extends Omit<ElementProps, 'onSelect'> {
  activeDescendant: string | undefined;
  commands: ListItem[];
  focusedIndex: number;
  onSelect: (index: number) => void;
}

export const CmdList = ({
  activeDescendant,
  commands,
  focusedIndex,
  onSelect,
}: CmdListProps) => {
  const components = useComponents();
  const listRef = useRef<HTMLDivElement>(null);
  const vListRef = useRef<FixedSizeList>(null);

  // useScrollIntoView(
  //   listRef,
  //   activeDescendant ? `#${activeDescendant}` : undefined,
  // );

  // TODO: scroll to top when searching
  // how though? (if focusedIndex doesn't change, and referencing items can be dangerous)

  useLayoutEffect(() => {
    if (vListRef.current != null) {
      vListRef.current.scrollToItem(focusedIndex);
    }
  }, [focusedIndex]);

  const handleSelect = useCallback(
    id => {
      const index = commands.findIndex(cmd => cmd.id === id);
      onSelect(index);
    },
    [commands, onSelect],
  );

  if (commands.length === 0) {
    return <CmdHelpText description="No commands matching" />;
  }

  const itemHeight = 32;
  const listHeight = Math.min(itemHeight * 12, commands.length * itemHeight);

  return (
    <List
      aria-activedescendant={activeDescendant}
      as={components.List}
      ref={listRef}
      role="tree"
      tabIndex={0}
    >
      <AutoSizer disableHeight>
        {({ width }) => (
          <FixedSizeList
            height={listHeight}
            itemCount={commands.length}
            itemSize={itemHeight}
            ref={vListRef}
            width={width}
          >
            {({ index, style }) => {
              const cmd = commands[index];
              return (
                <div style={style}>
                  <CmdOption
                    focused={index === focusedIndex}
                    id={cmd.id}
                    key={cmd.id}
                    label={cmd.label}
                    matches={cmd.matches}
                    onSelect={handleSelect}
                  />
                </div>
              );
            }}
          </FixedSizeList>
        )}
      </AutoSizer>
    </List>
  );
};
