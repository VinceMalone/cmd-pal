import * as React from 'react';

import { useComponent } from '../../contexts/components';
import { moveFocus, useListContext } from '../../contexts/list';
import { OptionListItem } from '../../types/Option';
import { useDomId } from '../../utils/domId';
import { Measure } from '../Measure';
import { VirtualItems } from '../VirtualItems';

interface OptionListComponentProps {
  'aria-activedescendant'?: string;
  role?: string;
}

export type OptionListComponent = React.ElementType<OptionListComponentProps>;

export interface OptionListItemProps {
  focused: boolean;
  item: OptionListItem;
  onSelect(id: string): void;
}

export interface OptionListProps {
  as?: OptionListComponent;
  children(props: OptionListItemProps): React.ReactElement;
  emptyLabel?: string;
  onSelect(item: OptionListItem, index: number): void;
}

export const OptionList: React.FC<OptionListProps> = ({
  as,
  children,
  emptyLabel = 'No items matching',
  onSelect,
}) => {
  const OptionListComponent = useComponent('OptionList', as, 'div');

  const { dispatch, ref, state } = useListContext();
  const { focusedIndex } = state;

  React.useLayoutEffect(() => {
    if (ref.current.scrollToItem != null) {
      ref.current.scrollToItem(focusedIndex);
    }
  }, [focusedIndex, ref]);

  const handleSelect = React.useCallback(
    (id: string) => {
      const index = state.items.findIndex(item => item.id === id);
      if (index > -1) {
        if (focusedIndex !== index) {
          dispatch(moveFocus({ index }));
        }
        onSelect(state.items[index], index);
      }
    },
    [dispatch, focusedIndex, onSelect, state.items],
  );

  const emptyLabelId = useDomId('list-item');
  let { activeDescendant, items } = state;

  if (state.items.length === 0) {
    activeDescendant = emptyLabelId;
    items = [
      {
        id: emptyLabelId,
        label: emptyLabel,
        matches: [],
        ordinal: -1,
        resolve: null,
      },
    ];
  }

  return (
    <OptionListComponent aria-activedescendant={activeDescendant} role="tree">
      <Measure
        element={children({
          focused: false,
          item: {
            id: '',
            label: 'Label',
            matches: [],
            ordinal: -1,
            resolve: null,
          },
          onSelect: () => undefined,
        })}
      >
        {({ height }) => (
          // VirtualItems needs an unstyled element to measure
          <div>
            <VirtualItems
              itemCount={items.length}
              itemHeight={height}
              ref={ref}
            >
              {({ index }) =>
                children({
                  focused: index === focusedIndex,
                  item: items[index],
                  onSelect: handleSelect,
                })
              }
            </VirtualItems>
          </div>
        )}
      </Measure>
    </OptionListComponent>
  );
};
