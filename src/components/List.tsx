import * as React from 'react';

import { useListContext } from '../contexts/list';
import { ChoiceListItem } from '../types/Choice';
import { useDomId } from '../utils/domId';

import { Measure } from './Measure';
import { VirtualItems } from './VirtualItems';

/**
 * TODO: under construction
 * - kind of gave up... `children` is a convienant API for measuring and rendering empty item
 */

//

interface ListItemContextValue {
  focused: boolean;
  item: ChoiceListItem;
  onSelect(id: string): void;
}

export const ListItemContext = React.createContext<ListItemContextValue | null>(
  null,
);

export const useListItemContext = () => {
  const context = React.useContext(ListItemContext);
  if (context === null) {
    throw new Error('TODO: message about required provider');
  }
  return context;
};

//

export interface ChoiceMenuListProps {
  as?: React.ComponentType<{
    'aria-activedescendant': string | undefined;
    role: string;
  }>;
  children: (props: {
    focused: boolean;
    item: ChoiceListItem;
    onSelect(id: string): void;
  }) => React.ReactElement;
  emptyLabel?: string;
  onSelect(item: ChoiceListItem, index: number): void;
}

export const ChoiceMenuList: React.FC<ChoiceMenuListProps> = ({
  as: As = 'div',
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
        <As aria-activedescendant={activeDescendant} role="tree">
          <VirtualItems
            focusedIndex={state.focusedIndex}
            itemHeight={height}
            items={items}
            onSelect={handleSelect}
          >
            {({ focused, item, onSelect }) => (
              <ListItemContext.Provider value={{ focused, item, onSelect }}>
                {children}
              </ListItemContext.Provider>
            )}
          </VirtualItems>
        </As>
      )}
    </Measure>
  );
};
