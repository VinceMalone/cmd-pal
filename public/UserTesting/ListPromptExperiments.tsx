import * as React from 'react';

import { List } from '../../src/prompts/List';

import { MyPalette } from './MyPalette';
import { Test } from './Test';

export interface ListPromptExperimentsProps {
  numeral: number;
}

export const ListPromptExperiments: React.FC<ListPromptExperimentsProps> = ({
  numeral,
}) => {
  return (
    // <Test title="Confirm Prompt Experiments">
    <MyPalette
      openOn={`option+shift+${numeral}`}
      prompt={[<List key="1" message="List your favorite ____" />]}
    />
    // </Test>
  );
};
