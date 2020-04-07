import * as React from 'react';

import { MultiOption } from '../../src/prompts/MultiOption';
import { Demo } from '../Demo';
import { PaletteStory } from '../PaletteStory';

import { netflixOptions } from './fixtures';

export const MultiOptionPrompts = () => {
  return (
    <Demo title="Multi-Option Prompt">
      <PaletteStory
        openOn="option+shift+p"
        prompt={[
          <MultiOption
            key="1"
            message="Choose your favorite Netflix titles"
            options={netflixOptions}
            resolve={console.log}
          />,
        ]}
        summary="Choose your favorite Netflix titles"
      />

      <PaletteStory
        openOn="option+shift+1"
        prompt={[
          <MultiOption
            key="1"
            message="Choose your favorite Netflix titles"
            options={netflixOptions}
            resolve={console.log}
          />,
        ]}
        summary="Alt"
      />

      {/* TODO: empty */}
    </Demo>
  );
};
