import * as React from 'react';

import { labelToParts } from '../util/labelToParts';

export interface HighlightedProps {
  as?: React.ComponentType;
  label: string;
  matches?: [number, number][];
}

export const Highlighted: React.FC<HighlightedProps> = ({
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark#Accessibility_concerns
  as: Mark = 'mark',
  label,
  matches,
}) => {
  const parts = React.useMemo(() => labelToParts(label, matches ?? []), [
    label,
    matches,
  ]);

  return (
    <>
      {parts.map(part => {
        const Part = part.isMatch ? Mark : React.Fragment;
        return <Part key={part.id}>{part.value}</Part>;
      })}
    </>
  );
};
