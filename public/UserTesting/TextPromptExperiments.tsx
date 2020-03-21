import * as React from 'react';

import { Text } from '../../src/prompts/Text';

import { MyPalette } from './MyPalette';
import { Test } from './Test';

export interface TextPromptExperimentsProps {
  numeral: number;
}

export const TextPromptExperiments: React.FC<TextPromptExperimentsProps> = ({
  numeral,
}) => {
  return (
    // <Test title="Confirm Prompt Experiments">
    <MyPalette
      openOn={`option+shift+${numeral}`}
      prompt={[<Text key="1" message="Type it" />]}
    />
    // </Test>
  );
};
