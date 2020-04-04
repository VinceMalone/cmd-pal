import * as React from 'react';
import styled from 'styled-components';

import { useComponents } from '../contexts/components';

const DefaultCheckbox = styled.input.attrs(() => ({
  readOnly: true,
  tabIndex: -1,
  type: 'checkbox',
}))`
  cursor: inherit;
  outline: none;
`;

interface AsProps {
  checked: boolean;
}

export interface VisualCheckboxProps {
  as?: React.ComponentType<AsProps>;
  checked?: boolean;
}

export const VisualCheckbox: React.FC<VisualCheckboxProps> = ({
  as,
  checked = false,
}) => {
  // const { Checkbox = as ?? DefaultCheckbox } = useComponents();
  const Checkbox = DefaultCheckbox; // TODO...
  return <Checkbox checked={checked} />;
};
