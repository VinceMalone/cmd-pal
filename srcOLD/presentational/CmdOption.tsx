import * as React from 'react';
import { useCallback, useMemo } from 'react';

import { useComponents } from '../util/components';
import { labelToParts } from '../util/labelToParts';

// TODO: type the `As` component?
// type CmdOptionAs = React.ElementType<{
//   ariaLabel?: string;
//   ariaSelected?: string;
//   id?: string;
//   onClick?: (event: React.MouseEvent) => void;
//   role?: string;
// }>;

type ElementProps = JSX.IntrinsicElements['div'];

export interface CmdOptionProps extends Omit<ElementProps, 'onSelect'> {
  focused?: boolean;
  id: string;
  label: string;
  matches?: [number, number][];
  onSelect: (id: string) => void;
}

export const CmdOption = ({
  focused = false,
  id,
  label,
  matches,
  onSelect,
  ...props
}: CmdOptionProps) => {
  const { Option = 'div', Mark = 'mark' } = useComponents();

  const parts = useMemo(() => labelToParts(label, matches || []), [
    label,
    matches,
  ]);

  const handleClick = useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);

  return (
    <Option
      {...props}
      aria-label={label}
      aria-selected={focused}
      id={id}
      onClick={handleClick}
      role="treeitem"
    >
      {parts.map(part => {
        const Part = part.isMatch ? Mark : 'span';
        return <Part key={part.id}>{part.value}</Part>;
      })}
    </Option>
  );
};
