import * as React from 'react';
import styled from 'styled-components';

import { useComponent } from '../../contexts/components';
import { useListContext } from '../../contexts/list';

const ReadonlyCheckbox = styled.input.attrs(() => ({
  readOnly: true,
  tabIndex: -1,
  type: 'checkbox',
}))`
  cursor: inherit;
  outline: none;
`;

interface MultiOptionPromptCheckboxComponentProps {
  checked?: boolean;
}

export type MultiOptionPromptCheckboxComponent = React.ElementType<
  MultiOptionPromptCheckboxComponentProps
>;

export interface MultiOptionPromptCheckboxProps {
  as?: MultiOptionPromptCheckboxComponent;
  checked: boolean;
}

export const MultiOptionPromptCheckbox: React.FC<MultiOptionPromptCheckboxProps> = ({
  as,
  checked,
}) => {
  const { state } = useListContext();
  const Checkbox = useComponent(
    'MultiOptionPromptCheckbox',
    as,
    ReadonlyCheckbox,
  );

  // Do not render for "fake" items
  // ...such as the list item shown with a "the list is empty" message
  return <>{state.items.length > 0 && <Checkbox checked={checked} />}</>;
};
