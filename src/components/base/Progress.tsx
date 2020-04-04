import * as React from 'react';
import styled from 'styled-components';

import { useComponent } from '../../contexts/components';

const DefaultProgress = styled.progress`
  width: 100%;
`;

interface ProgressComponentProps {
  children?: React.ReactNode;
}

export type ProgressComponent = React.ElementType<ProgressComponentProps>;

export interface ProgressProps {
  as?: ProgressComponent;

  /** TODO: use a comment to include in autodoc */
  children?: React.ReactNode;
}

export const Progress: React.FC<ProgressProps> = ({ as, children }) => {
  const ProgressComponent = useComponent('Progress', as, DefaultProgress);
  return <ProgressComponent>{children}</ProgressComponent>;
};
