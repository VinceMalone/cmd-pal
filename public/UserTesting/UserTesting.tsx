import * as React from 'react';

import { ConfirmPromptExperiments } from './ConfirmPromptExperiments';
import { ListPromptExperiments } from './ListPromptExperiments';
import { MultiChoiceExperiments } from './MultiChoiceExperiments';
import { SingleChoicePromptExperiments } from './SingleChoicePromptExperiments';
import { TextPromptExperiments } from './TextPromptExperiments';

export const UserTesting = () => {
  return (
    <>
      <MultiChoiceExperiments />
      <ConfirmPromptExperiments numeral={1} />
      <ListPromptExperiments numeral={2} />
      <SingleChoicePromptExperiments numeral={3} />
      <TextPromptExperiments numeral={4} />
    </>
  );
};
