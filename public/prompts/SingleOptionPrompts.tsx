import * as React from 'react';

import { SingleOption } from '../../src/prompts/SingleOption';
import { Demo } from '../Demo';
import { PaletteStory } from '../PaletteStory';

import { branches } from './fixtures';

export const SingleOptionPrompts = () => {
  return (
    <Demo title="Single-Option Prompt">
      <PaletteStory
        openOn="option+shift+p"
        prompt={[
          <SingleOption
            key="1"
            message="Choose a branch"
            options={() => [
              {
                label: 'Create new branch',
                resolve: 'TODO: spawn new palette',
              },
              ...branches.map(branch => ({
                label: branch.name,
                resolve: branch.name,
              })),
            ]}
            resolve={console.log}
          />,
        ]}
        summary="Choose a branch"
      />

      {/* TODO: side effect */}

      {/* TODO: empty */}
    </Demo>
  );
};
