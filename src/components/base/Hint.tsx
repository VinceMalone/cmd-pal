import * as React from 'react';

import { useComponent } from '../../contexts/components';

import { Paragraph, ParagraphComponent } from './Paragraph';

export type HintComponent = ParagraphComponent;

export interface HintProps {
  as?: HintComponent;
  children?: React.ReactNode;
}

export const Hint: React.FC<HintProps> = ({ as, children }) => {
  const HintComponent = useComponent('Hint', as);
  return <Paragraph as={HintComponent}>{children}</Paragraph>;
};
