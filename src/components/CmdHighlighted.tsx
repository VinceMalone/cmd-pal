import * as React from 'react';

import { labelToParts } from '../utils/labelToParts';

export interface CmdHighlightedProps {
  as?: React.ComponentType;
  label: string;
  matches?: [number, number][];
}

export const CmdHighlighted: React.FC<CmdHighlightedProps> = ({
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
