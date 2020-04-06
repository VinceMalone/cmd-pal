import * as React from 'react';

import { useComponent } from '../../contexts/components';

interface KbdComponentProps {
  children?: React.ReactNode;
}

export type KbdComponent = React.ElementType<KbdComponentProps>;

export interface KbdProps {
  as?: KbdComponent;
  children?: React.ReactNode;
}

export const Kbd: React.FC<KbdProps> = ({ as, children }) => {
  const KbdComponent = useComponent('Kbd', as, 'kbd');
  return <KbdComponent>{children}</KbdComponent>;
};
