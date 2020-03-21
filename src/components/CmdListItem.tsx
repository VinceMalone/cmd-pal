import * as React from 'react';
import styled from 'styled-components';

// filter: ${props => props['aria-selected'] ? 'invert(100%)' : 'invert(0%)'};

const ListItem = styled.div`
  /* background-color: white; */
  outline-color: black;
  outline-offset: -1px;
  outline-width: 1px;
  outline-style: ${props => (props['aria-selected'] ? 'dotted' : 'none')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
`;

export interface CmdListItemProps {
  as?: React.ComponentType<{
    // TODO
    id?: string;
    onClick?(): void;
    role?: string;
  }>;
  children?: React.ReactNode;
  focused?: boolean;
  id: string;
  label: string;
  onSelect: (id: string) => void;
}

export const CmdListItem: React.FC<CmdListItemProps> = ({
  as,
  children,
  focused,
  id,
  label,
  onSelect,
  ...props
}) => {
  const handleClick = React.useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);

  return (
    <ListItem
      {...props}
      aria-label={label}
      aria-selected={focused}
      as={as}
      id={id}
      onClick={handleClick}
      role="treeitem"
    >
      {children}
    </ListItem>
  );
};
