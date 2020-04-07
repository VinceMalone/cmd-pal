import * as React from 'react';

import { useExperiments } from '../../components/Experiments';
import { filter, moveFocus, useListContext } from '../../contexts/list';
import { toggle, useTokensContext } from '../../contexts/tokens';
import { OptionListItem } from '../../types/Option';

export const useToggleItem = () => {
  const { experiment } = useExperiments();
  const { dispatch: listDispatch } = useListContext();
  const { dispatch: tokensDispatch } = useTokensContext();

  return React.useCallback(
    (item: OptionListItem) => {
      tokensDispatch(toggle(item));
      if (experiment('FILTER_VALUE_AFTER_SELECTION', 'CLEAR')) {
        listDispatch(filter(''));
      } else if (
        experiment('FILTER_VALUE_AFTER_SELECTION', 'CLEAR_AND_SCROLL')
      ) {
        listDispatch(filter(''));
        listDispatch(moveFocus({ index: item.ordinal }));
      }
    },
    [experiment, listDispatch, tokensDispatch],
  );
};
