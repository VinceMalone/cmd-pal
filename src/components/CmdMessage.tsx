import * as React from 'react';

// TODO: deprecated -- remove

//

// type ElementProps = React.HTMLAttributes<HTMLDivElement>;

// export interface CmdMessageProps extends ElementProps {
export interface CmdMessageProps {
  as?: React.ElementType<{ children?: React.ReactNode }>;
  // as?: React.ComponentType<{}>;
  children?: React.ReactNode;
}

export const CmdMessage: React.FC<CmdMessageProps> = ({
  as: As = 'div',
  children,
}) => <As>{children}</As>;
