import * as React from 'react';

import { useComponent } from '../../contexts/components';

import { Paragraph, ParagraphComponent } from './Paragraph';

export type MessageComponent = ParagraphComponent;

export interface MessageProps {
  as?: MessageComponent;
  children?: React.ReactNode;
}

export const Message: React.FC<MessageProps> = ({ as, children }) => {
  const MessageComponent = useComponent('Message', as);
  return <Paragraph as={MessageComponent}>{children}</Paragraph>;
};
