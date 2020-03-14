import { useCallback, useEffect, useReducer } from 'react';

import reducer, * as duck from '../ducks/listDuck';
import { Item } from '../types';

export const useList = (list: Item[]) => {
  const [state, dispatch] = useReducer(reducer, duck.initialState);

  useEffect(() => {
    dispatch(duck.setItems(list));
  }, [list]);

  const handleMoveFocus = useCallback(
    (delta: number) => dispatch(duck.moveFocus(delta)),
    [],
  );

  const handleSearch = useCallback(
    (query: string) => dispatch(duck.search(query)),
    [],
  );

  const reset = useCallback(() => dispatch(duck.reset()), []);

  const { activeDescendant, focusedIndex, items, searchQuery } = state;

  return {
    activeDescendant,
    focusedIndex,
    handleMoveFocus,
    handleSearch,
    items,
    reset,
    searchQuery,
  };
};
