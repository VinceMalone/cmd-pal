import * as React from 'react';

import { useComponents } from '../util/components';

type ElementProps = JSX.IntrinsicElements['div'];

export interface CmdHelpTextProps extends ElementProps {
  description: string;
}

export const CmdHelpText = ({ description, ...props }: CmdHelpTextProps) => {
  const { HelpText = 'div' } = useComponents();

  return (
    <HelpText {...props} aria-label={description}>
      {description}
    </HelpText>
  );
};
