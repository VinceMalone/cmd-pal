import * as React from 'react';

import { useExperiments } from '../../components/Experiments';
import { moveFocus, search, useListContext } from '../../contexts/list';
import { toggle, useTokensContext } from '../../contexts/tokens';
import { OptionListItem } from '../../types/Option';

export const useToggleItem = () => {
  const { experiment } = useExperiments();
  const { dispatch: listDispatch } = useListContext<OptionListItem>();
  const { dispatch: tokensDispatch } = useTokensContext();

  return React.useCallback(
    (item: OptionListItem) => {
      tokensDispatch(toggle(item));
      if (experiment('FILTER_VALUE_AFTER_SELECTION', 'CLEAR')) {
        listDispatch(search(''));
      } else if (
        experiment('FILTER_VALUE_AFTER_SELECTION', 'CLEAR_AND_SCROLL')
      ) {
        listDispatch(search(''));
        listDispatch(moveFocus({ index: item.ordinal }));
      }
    },
    [experiment, listDispatch, tokensDispatch],
  );
};
