import * as React from 'react';
import { useCallback, useMemo } from 'react';

import { Match } from '../../typings/Match';

import { useComponents } from '../util/components';
import labelToParts from '../util/labelToParts';

export interface CmdItemProps {
  category?: string;
  description: string;
  focused?: boolean;
  id: string;
  matches?: Match[];
  onSelect: (id: string) => void;
}

export const CmdItem = ({
  category,
  description,
  focused = false,
  id,
  matches,
  onSelect,
  ...props
}: CmdItemProps) => {
  const label = `${category == null ? '' : `${category}: `}${description}`;
  const parts = useMemo(() => labelToParts(label, matches || []), [label, matches]);
  const { Item = 'div', Mark = 'mark' } = useComponents();

  const handleClick = useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);

  return (
    <Item
      {...props}
      aria-label={description}
      aria-selected={focused}
      id={id}
      onClick={handleClick}
      role="treeitem"
    >
      {parts.map(part => {
        const Part = part.isMatch ? Mark : 'span';
        return <Part key={part.id}>{part.value}</Part>;
      })}
    </Item>
  );
};
