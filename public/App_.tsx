import { company, random, seed } from 'faker';
import * as React from 'react';

import { Palette } from '../src/Palette';
import { SingleChoice as PromptSingleChoice } from '../src/prompts/SingleChoice';
import { Text as PromptText } from '../src/prompts/Text';
import * as vscode from '../themes/vscode';

import { Directions } from './Directions';
import { HotKey } from './HotKey';

seed(1);

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const choices = Array.from({ length: 2000 }, () => ({
  label: company.catchPhrase(),
  resolve: random.uuid(),
}));

export const App = () => (
  <>
    <Directions>
      Press <HotKey>Option+Shift+P</HotKey> to open (or{' '}
      <HotKey>Alt+Shift+P</HotKey> on Windows)
      <br />
      and <HotKey>Esc</HotKey> to close.
    </Directions>
    {/* <Palette components={vscode.components} theme={vscode.theme}>
      <PromptText
        label="async1"
        message="This is the message"
        resolve={async value => {
          await wait(1000);
          return value;
        }}
      />
      <PromptText
        label="async2"
        resolve={async value => {
          await wait(1000);
          return value;
        }}
      />

      <PromptSingleChoice
        choices={choices}
        itemHeight={22}
        resolve={value => value}
      />
      <PromptText<string, number>
        initialValue={async value => {
          await wait(1000);
          return value;
        }}
        label="TODO"
        placeholder="gimme a number"
        resolve={value => Number(value)}
      />
      <PromptText<number, number>
        label="TODO"
        resolve={(value, sum) => sum + Number(value)}
      />
      <PromptSingleChoice<number, number>
        choices={async sum => {
          await wait(1000);
          return Array(10)
            .fill(null)
            .map((_, index) => ({
              label: (sum * (index + 1)).toString(),
              resolve: (sum * (index + 1)).toString(),
            }));
        }}
        itemHeight={22}
        resolve={(value, sum) => sum + Number(value)}
      />
    </Palette> */}
  </>
);
