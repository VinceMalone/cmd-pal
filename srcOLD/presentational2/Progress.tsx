import * as React from 'react';

// TODO: pass-through props

export interface ProgressProps {
  as?: React.ComponentType<{}>;
  children?: React.ReactNode;
}

export const Progress: React.FC<ProgressProps> = ({
  as: As = 'div',
  children = 'Executing...',
}) => <As>{children}</As>;
