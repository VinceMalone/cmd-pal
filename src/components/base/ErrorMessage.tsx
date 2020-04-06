import * as React from 'react';

import { useComponent } from '../../contexts/components';

import { Paragraph, ParagraphComponent } from './Paragraph';

export type ErrorMessageComponent = ParagraphComponent;

export interface ErrorMessageProps {
  as?: ErrorMessageComponent;
  children?: React.ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ as, children }) => {
  const ErrorMessageComponent = useComponent('ErrorMessage', as);
  return <Paragraph as={ErrorMessageComponent}>{children}</Paragraph>;
};
