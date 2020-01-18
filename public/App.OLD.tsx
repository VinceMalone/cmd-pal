import { random, seed } from 'faker';
import * as React from 'react';

import { CmdPal } from '../srcOLD';
import * as namely from '../themes/namely';
import { Command } from '../typings/Item';

import { Directions } from './Directions';
import { HotKey } from './HotKey';

seed(1);

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const commands: Command[] = [
  {
    id: random.uuid(),
    label: 'Sequence',
    exec: [
      {
        type: 'text',
        name: 'firstone',
        exec: async value => {
          console.log('Sequence → text → exec', value);
          await wait(800);
          return value;
        },
      },
      {
        type: 'single-choice',
        name: 'secondone',
        choices: value => [
          { id: random.uuid(), label: `A (${value.firstone})`, value: 'A' },
          { id: random.uuid(), label: 'B', value: 'B' },
          { id: random.uuid(), label: 'C', value: 'C' },
        ],
        exec: async value => {
          console.log('Sequence → single-choice → exec', value);
          await wait(800);
          return value;
        },
      },
    ],
  },
  {
    id: random.uuid(),
    label: 'Nested',
    exec: [
      {
        type: 'text',
        name: 'lvl1',
        message: 'Level 1',
        exec: [
          {
            type: 'single-choice',
            name: 'lvl2',
            message: 'Level 2',
            choices: value => [
              { id: random.uuid(), label: `A (${value.lvl1})`, value: 'A' },
              { id: random.uuid(), label: 'B', value: 'B' },
              { id: random.uuid(), label: 'C', value: 'C' },
            ],
            exec: async value => {
              console.log('Nested → lvl2 → exec', value);
              await wait(800);
              return value;
            },
          },
        ],
      },
    ],
  },
];

export const App = () => (
  <>
    <Directions>
      Press <HotKey>Option+Shift+P</HotKey> to open (or{' '}
      <HotKey>Alt+Shift+P</HotKey> on Windows)
      <br />
      and <HotKey>Esc</HotKey> to close.
    </Directions>
    <CmdPal
      commands={commands}
      components={namely.components}
      theme={namely.theme}
    />
  </>
);
