import { company, random, seed } from 'faker';
import * as React from 'react';

import { Palette } from '../src/Palette';
import { PromptSingleChoice, PromptText } from '../src/prompts';
import * as namely from '../themes/namely';

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
    <Palette
      components={namely.components}
      pipe={[
        <PromptText
          key="async1"
          label="async1"
          resolve={async value => {
            await wait(1000);
            return value;
          }}
        />,
        <PromptText
          key="async2"
          label="async2"
          resolve={async value => {
            await wait(1000);
            return value;
          }}
        />,

        // <PromptCommands
        //   commands={[
        //     {
        //       label: '',
        //       // TODO: change `Choice` to use `resolve` rather than `value`
        //       // Can be `T | Promise<T> | (() => T) | (() => Promise<T>)`
        //       resolve: () => {},
        //     },
        //   ]}
        //   itemHeight={32}
        //   key="commands-wip"
        //   resolve={undefined}
        // />,

        <PromptSingleChoice
          choices={choices}
          itemHeight={32}
          key="1"
          resolve={value => value}
        />,
        <PromptText<string, number>
          initialValue={async value => {
            await wait(1000);
            return value;
          }}
          key="2"
          label="TODO"
          placeholder="gimme a number"
          resolve={value => Number(value)}
        />,
        <PromptText<number, number>
          key="3"
          label="TODO"
          resolve={(value, sum) => sum + Number(value)}
        />,
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
          itemHeight={32}
          key="4"
          resolve={(value, sum) => sum + Number(value)}
        />,
      ]}
      theme={namely.theme}
    />
  </>
);
