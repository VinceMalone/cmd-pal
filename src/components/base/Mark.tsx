import * as React from 'react';

import { useComponent } from '../../contexts/components';
import { Match } from '../../types/List';
import { labelToParts } from '../../utils/labelToParts';

interface MarkComponentProps {
  children?: React.ReactNode;
}

export type MarkComponent = React.ElementType<MarkComponentProps>;

export interface MarkProps {
  as?: MarkComponent;
  label: string;
  matches?: Match[];
}

export const Mark: React.FC<MarkProps> = ({ as, label, matches }) => {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark#Accessibility_concerns
  const MarkComponent = useComponent('Mark', as, 'mark');

  const parts = React.useMemo(() => labelToParts(label, matches ?? []), [
    label,
    matches,
  ]);

  return (
    <>
      {parts.map(part => {
        const Part = part.isMatch ? MarkComponent : React.Fragment;
        return <Part key={part.id}>{part.value}</Part>;
      })}
    </>
  );
};
