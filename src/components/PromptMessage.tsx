import * as React from 'react';

import { useComponents } from '../contexts/components';

export interface PromptMessageProps {
  as?: React.ComponentType<{
    children?: React.ReactNode;
  }>;
  children?: React.ReactNode;
}

export const PromptMessage: React.FC<PromptMessageProps> = ({
  as,
  children,
}) => {
  const components = useComponents();
  const Message = as ?? components.Message ?? 'p';
  return <Message>{children}</Message>;
};
