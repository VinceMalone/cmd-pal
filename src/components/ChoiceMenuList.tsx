import * as React from 'react';

import { useListContext } from '../contexts/list';
import { ChoiceListItem } from '../types/Choice';
import { useDomId } from '../utils/domId';

import { CmdList } from './CmdList';
import { Measure } from './Measure';

export interface ChoiceMenuListProps {
  as?: React.ComponentType<{}>;
  children: (props: {
    focused: boolean;
    item: ChoiceListItem;
    onSelect(id: string): void;
  }) => React.ReactElement;
  emptyLabel?: string;
  onSelect(item: ChoiceListItem, index: number): void;
}

export const ChoiceMenuList: React.FC<ChoiceMenuListProps> = ({
  as,
  children,
  emptyLabel = 'No items matching',
  onSelect,
}) => {
  const { state } = useListContext<ChoiceListItem>();

  const handleSelect = React.useCallback(
    (index: number) => {
      const item = state.items[index];
      if (item !== undefined) {
        onSelect(item, index);
      }
    },
    [onSelect, state.items],
  );

  const emptyLabelId = useDomId('list-item');
  let activeDescendant = state.activeDescendant;
  let items = state.items;

  if (state.items.length === 0) {
    activeDescendant = emptyLabelId;
    items = [
      {
        id: emptyLabelId,
        label: emptyLabel,
        matches: [],
        resolve: null,
      },
    ];
  }

  return (
    <Measure
      element={children({
        focused: false,
        item: {
          id: '',
          label: 'Label',
          matches: [],
          resolve: null,
        },
        onSelect: () => undefined,
      })}
    >
      {({ height }) => (
        <CmdList
          activeDescendant={activeDescendant}
          as={as}
          focusedIndex={state.focusedIndex}
          itemHeight={height}
          items={items}
          onSelect={handleSelect}
        >
          {children}
        </CmdList>
      )}
    </Measure>
  );
};
