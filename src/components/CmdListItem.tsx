import * as React from 'react';

export interface CmdListItemProps {
  as?: React.ElementType<{}>;
  children?: React.ReactNode;
  focused?: boolean;
  id: string;
  label: string;
  onSelect: (id: string) => void;
}

export const CmdListItem: React.FC<CmdListItemProps> = ({
  as: As = 'div',
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
    <As
      {...props}
      aria-label={label}
      aria-selected={focused}
      id={id}
      onClick={handleClick}
      role="treeitem"
    >
      {children}
    </As>
  );
};
