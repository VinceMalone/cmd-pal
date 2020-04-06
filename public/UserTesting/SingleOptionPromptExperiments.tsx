import faker from 'faker/locale/en';
import * as React from 'react';

import { SingleOption } from '../../src/prompts/SingleOption';

import { MyPalette } from './MyPalette';
import { Test } from './Test';

faker.seed(1);

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getBranchNames = async () => {
  await wait(500);
  return Array.from({ length: 30 }, () => ({
    name: faker.system.fileName(),
  }));
};

export interface SingleOptionPromptExperimentsProps {
  numeral: number;
}

export const SingleOptionPromptExperiments: React.FC<SingleOptionPromptExperimentsProps> = ({
  numeral,
}) => {
  return (
    // <Test title="Confirm Prompt Experiments">
    <MyPalette
      openOn={`option+shift+${numeral}`}
      prompt={[
        <SingleOption
          key="1"
          message="Choose a branch"
          options={async () => {
            const branches = await getBranchNames();
            console.log('branches', branches);
            return [
              {
                label: 'Create new branch',
                resolve: 'TODO: spawn new palette',
              },
              ...branches.map(branch => ({
                label: branch.name,
                resolve: branch.name,
              })),
            ];
          }}
        />,
      ]}
    />
    // </Test>
  );
};
