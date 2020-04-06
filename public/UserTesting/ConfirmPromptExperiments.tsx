import * as React from 'react';
import styled from 'styled-components';

import { Confirm } from '../../src/prompts/Confirm';
import {
  ConfirmButtonNo,
  ConfirmButtonYes,
} from '../../src/prompts/Confirm/ConfirmButton';

import { MyPalette } from './MyPalette';
import { Test } from './Test';

// TODO: include <ButtonGroup> in custom render

const Message = styled.div`
  color: rgb(97, 97, 97);
  cursor: default;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 16px;
  margin: 1em 1em 0;
`;

export interface ConfirmPromptExperimentsProps {
  numeral: number;
}

export const ConfirmPromptExperiments: React.FC<ConfirmPromptExperimentsProps> = ({
  numeral,
}) => {
  return (
    // <Test title="Confirm Prompt Experiments">
    <MyPalette
      openOn={`option+shift+${numeral}`}
      prompt={[
        <Confirm
          key="1"
          message="Are you sure?"
          // render={() => (
          //   <>
          //     <Message>Are you sure?</Message>
          //     <ButtonGroup>
          //       <ConfirmButtonYes />
          //       <ConfirmButtonNo />
          //     </ButtonGroup>
          //   </>
          // )}
        />,
      ]}
    />
    // </Test>
  );
};
