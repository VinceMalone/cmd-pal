import { company, random, seed } from 'faker';
import * as React from 'react';

import { CmdPal } from '../src';
import * as namely from '../themes/namely';
import { Command } from '../typings/Command';

import { Directions } from './Directions';
import { HotKey } from './HotKey';

seed(123);

const commands: Command[] = Array.from({ length: 200 }, () => ({
  description: company.catchPhrase(),
  exec: () => new Promise(resolve => setTimeout(resolve, 3000)),
  id: random.uuid(),
}));

export const App = () => (
  <>
    <Directions>
      Press <HotKey>Option+Shift+P</HotKey> to open (or <HotKey>Alt+Shift+P</HotKey> on Windows)
      <br />
      and <HotKey>Esc</HotKey> to close.
    </Directions>
    <CmdPal commands={commands} components={namely.components} theme={namely.theme} />
  </>
);
