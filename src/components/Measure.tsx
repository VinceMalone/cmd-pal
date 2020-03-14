import * as React from 'react';
import { useMeasure } from 'react-use';

import { VisuallyHidden } from './VisuallyHidden';

export interface Rect {
  height: number;
  width: number;
}

export interface MeasureProps {
  children(rect: Rect): React.ReactNode;
  element: React.ReactNode;
}

export const Measure: React.FC<MeasureProps> = ({ children, element }) => {
  const [ref, { height, width }] = useMeasure();

  return (
    <>
      <VisuallyHidden data-measure>
        <div ref={ref}>{element}</div>
      </VisuallyHidden>
      {children({ height, width })}
    </>
  );
};
