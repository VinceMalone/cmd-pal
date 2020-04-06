import * as React from 'react';
import styled from 'styled-components';

import { useComponent } from '../../contexts/components';

const DefaultButtonGroup = styled.div`
  margin: 1em 0;
`;

interface ConfirmPromptButtonGroupComponentProps {
  children?: React.ReactNode;
}

export type ConfirmPromptButtonGroupComponent = React.ElementType<
  ConfirmPromptButtonGroupComponentProps
>;

export interface ConfirmPromptButtonGroupProps {
  as?: ConfirmPromptButtonGroupComponent;
  children?: React.ReactNode;
}

export const ConfirmPromptButtonGroup: React.FC<ConfirmPromptButtonGroupProps> = ({
  as,
  children,
}) => {
  const ButtonGroup = useComponent(
    'ConfirmPromptButtonGroup',
    as,
    DefaultButtonGroup,
  );

  return <ButtonGroup>{children}</ButtonGroup>;
};
