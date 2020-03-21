import * as React from 'react';

import { useComponents } from '../contexts/components';

export interface PromptProgressProps {
  as?: React.ComponentType<{
    children?: React.ReactNode;
  }>;

  /** Where the magic happens */
  children?: React.ReactNode;
}

export const PromptProgress: React.FC<PromptProgressProps> = ({
  as,
  children = 'Loading...',
}) => {
  const components = useComponents();
  // const Progress = as ?? components.Progress ?? 'div'; // TODO: undo
  const Progress = as || components.Progress || 'div';
  return <Progress>{children}</Progress>;
};

// PromptProgress.defaultProps = {
//   children: 'Loading...',
// };
