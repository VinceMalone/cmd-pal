import * as React from 'react';

import {
  ExperimentsProvider,
  ExperimentSettings,
} from '../../src/components/Experiments';

import { ConfirmPromptExperiments } from './ConfirmPromptExperiments';
import { ListPromptExperiments } from './ListPromptExperiments';
import { MultiOptionExperiments } from './MultiOptionExperiments';
import { SingleOptionPromptExperiments } from './SingleOptionPromptExperiments';
import { TextPromptExperiments } from './TextPromptExperiments';

export const UserTesting = () => {
  return (
    <ExperimentsProvider>
      <MultiOptionExperiments />
      <ConfirmPromptExperiments numeral={1} />
      <ListPromptExperiments numeral={2} />
      <SingleOptionPromptExperiments numeral={3} />
      <TextPromptExperiments numeral={4} />
      <ExperimentSettings />
    </ExperimentsProvider>
  );
};
