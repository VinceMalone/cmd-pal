import * as React from 'react';

import { useComponent } from '../../contexts/components';

interface ParagraphComponentProps {
  children?: React.ReactNode;
}

export type ParagraphComponent = React.ElementType<ParagraphComponentProps>;

export interface ParagraphProps {
  as?: ParagraphComponent;
  children?: React.ReactNode;
}

export const Paragraph: React.FC<ParagraphProps> = ({ as, children }) => {
  const ParagraphComponent = useComponent('Paragraph', as, 'p');
  return <ParagraphComponent>{children}</ParagraphComponent>;
};
