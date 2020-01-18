import * as React from 'react';

// TODO: pass-through props
// TODO: aria attributes

export interface CmdProgressProps {
  as?: React.ComponentType<{}>;
  children?: React.ReactNode;
}

export const CmdProgress: React.FC<CmdProgressProps> = ({
  as: As = 'div',
  children = 'Loading...',
}) => <As>{children}</As>;
