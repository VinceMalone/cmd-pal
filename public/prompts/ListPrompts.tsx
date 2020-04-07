import * as React from 'react';

import { List } from '../../src/prompts/List';
import { Demo } from '../Demo';
import { PaletteStory } from '../PaletteStory';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ListPrompts = () => {
  return (
    <Demo title="List Prompt">
      <PaletteStory
        openOn="option+shift+p"
        prompt={[
          <List
            key="1"
            message="List your favorite ____"
            resolve={console.log}
          />,
        ]}
        summary="List your favorite ____"
      />

      <PaletteStory
        openOn="option+shift+1"
        prompt={[<List key="1" resolve={console.log} />]}
        summary="No message"
      />

      <PaletteStory
        openOn="option+shift+2"
        prompt={[
          <List
            key="1"
            initialValue={['a', '', 'c']}
            message="Initial value should be ['a', '', 'c']"
            resolve={console.log}
          />,
        ]}
        summary="Initial value"
      />

      <PaletteStory
        openOn="option+shift+3"
        prompt={[
          <List
            key="1"
            initialValue={async () => {
              await wait(5000);
              return [];
            }}
            resolve={console.log}
          />,
        ]}
        summary="Progress (5s)"
      />

      <PaletteStory
        openOn="option+shift+4"
        prompt={[
          <List
            key="1"
            message={() => {
              throw new Error('Could not retrieve message');
            }}
            resolve={console.log}
          />,
        ]}
        summary="Error"
      />
    </Demo>
  );
};
