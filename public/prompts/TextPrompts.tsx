import * as React from 'react';

import { Text } from '../../src/prompts/Text';
import { Demo } from '../Demo';
import { PaletteStory } from '../PaletteStory';

export const TextPrompts = () => {
  return (
    <Demo title="Text Prompt">
      <PaletteStory
        openOn="option+shift+p"
        prompt={[
          <Text key="1" message="Type something" resolve={console.log} />,
        ]}
        summary="Type something"
      />

      {/* TODO: initialValue */}
      {/* TODO: placeholder */}
    </Demo>
  );
};
