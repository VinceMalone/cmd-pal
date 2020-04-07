import * as React from 'react';
import styled from 'styled-components';

import { useComponent } from '../../contexts/components';

const BaseOption = styled.div`
  outline-color: black;
  outline-offset: -1px;
  outline-width: 1px;
  outline-style: ${props => (props['aria-selected'] ? 'dotted' : 'none')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
`;

interface OptionComponentProps {
  children?: React.ReactNode;
  id?: string;
  onClick?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
  role?: string;
}

export type OptionComponent = React.ElementType<OptionComponentProps>;

export interface OptionProps {
  as?: OptionComponent;
  children?: React.ReactNode;
  id: string;
  label: string;
  onSelect?(id: string): void;
  selected?: boolean;
}

export const Option: React.FC<OptionProps> = ({
  as,
  children,
  id,
  label,
  onSelect,
  selected = false,
}) => {
  const OptionComponent = useComponent('Option', as);

  const handleClick = React.useCallback(() => {
    if (onSelect !== undefined) {
      onSelect(id);
    }
  }, [id, onSelect]);

  return (
    <BaseOption
      aria-label={label}
      aria-selected={selected}
      as={OptionComponent}
      id={id}
      onClick={handleClick}
      role="listitem"
    >
      {children}
    </BaseOption>
  );
};
