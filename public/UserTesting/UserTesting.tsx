import * as React from 'react';

import {
  ExperimentsProvider,
  ExperimentSettings,
} from '../../src/components/Experiments';

import { ConfirmPromptExperiments } from './ConfirmPromptExperiments';
import { ListPromptExperiments } from './ListPromptExperiments';
import { MultiChoiceExperiments } from './MultiChoiceExperiments';
import { SingleChoicePromptExperiments } from './SingleChoicePromptExperiments';
import { TextPromptExperiments } from './TextPromptExperiments';

export const UserTesting = () => {
  return (
    <ExperimentsProvider>
      <MultiChoiceExperiments />
      <ConfirmPromptExperiments numeral={1} />
      <ListPromptExperiments numeral={2} />
      <SingleChoicePromptExperiments numeral={3} />
      <TextPromptExperiments numeral={4} />
      <ExperimentSettings />
    </ExperimentsProvider>
  );
};
