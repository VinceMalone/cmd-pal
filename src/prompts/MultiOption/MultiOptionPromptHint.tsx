import * as React from 'react';

import { Hint, HintComponent } from '../../components/base/Hint';
import { Kbd } from '../../components/base/Kbd';
import { useComponent } from '../../contexts/components';

export type MultiOptionPromptHintComponent = HintComponent;

export interface MultiOptionPromptHintProps {
  as?: MultiOptionPromptHintComponent;
}

export const MultiOptionPromptHint: React.FC<MultiOptionPromptHintProps> = ({
  as,
}) => {
  const HintComponent = useComponent('MultiOptionPromptHint', as);

  return (
    <Hint as={HintComponent}>
      <Kbd>Shift</Kbd> + <Kbd>Enter</Kbd> to submit
    </Hint>
  );
};
