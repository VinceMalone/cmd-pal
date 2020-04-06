import * as React from 'react';

import { useComponent } from '../../contexts/components';

interface HeaderComponentProps {
  children?: React.ReactNode;
}

export type HeaderComponent = React.ElementType<HeaderComponentProps>;

export interface HeaderProps {
  as?: HeaderComponent;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ as, children }) => {
  const HeaderComponent = useComponent('Header', as, 'header');
  return <HeaderComponent>{children}</HeaderComponent>;
};
