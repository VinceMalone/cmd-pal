import * as React from 'react';

import { VisualCheckbox } from '../../components/VisualCheckbox';
import { useListContext } from '../../contexts/list';

export interface MultiChoicePromptCheckboxProps {
  checked: boolean;
}

export const MultiChoicePromptCheckbox: React.FC<MultiChoicePromptCheckboxProps> = ({
  checked,
}) => {
  const { state } = useListContext();

  // Do not render for "fake" items
  // ...such as the list item shown with a "the list is empty" message
  return <>{state.items.length > 0 && <VisualCheckbox checked={checked} />}</>;
};
