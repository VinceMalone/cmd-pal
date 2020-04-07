import * as React from 'react';
import styled from 'styled-components';

import {
  Confirm,
  ConfirmPromptButtonGroup,
  ConfirmButtonNo,
  ConfirmButtonYes,
} from '../../src/prompts/Confirm';
import { Demo } from '../Demo';
import { PaletteStory } from '../PaletteStory';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Message = styled.p`
  margin: 0;
  padding: 0.75em 0.75em 0;
`;

export const ConfirmPrompts = () => {
  return (
    <Demo title="Confirm Prompt">
      <PaletteStory
        openOn="option+shift+p"
        prompt={[
          <Confirm key="1" message="Are you sure?" resolve={console.log} />,
        ]}
        summary="Are you sure?"
      />

      <PaletteStory
        openOn="option+shift+1"
        prompt={[
          <Confirm
            key="1"
            render={() => (
              <>
                <Message>Are you sure?</Message>
                <ConfirmPromptButtonGroup>
                  <ConfirmButtonNo>Nah</ConfirmButtonNo>
                  <ConfirmButtonYes>Yep</ConfirmButtonYes>
                </ConfirmPromptButtonGroup>
              </>
            )}
            resolve={console.log}
          />,
        ]}
        summary="Custom render"
      />

      {/* TODO: no message */}

      <PaletteStory
        openOn="option+shift+2"
        prompt={[<Confirm key="1" initialValue={true} resolve={console.log} />]}
        summary="Initial value (true)"
      />

      <PaletteStory
        openOn="option+shift+3"
        prompt={[
          <Confirm
            key="1"
            message={async () => {
              await wait(5000);
              return '';
            }}
            resolve={console.log}
          />,
        ]}
        summary="Progress (5s)"
      />

      <PaletteStory
        openOn="option+shift+4"
        prompt={[
          <Confirm
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
