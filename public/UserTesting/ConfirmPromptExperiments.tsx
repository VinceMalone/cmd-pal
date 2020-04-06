import * as React from 'react';
import styled from 'styled-components';

import { Confirm } from '../../src/prompts/Confirm';
import {
  ConfirmButtonNo,
  ConfirmButtonYes,
} from '../../src/prompts/Confirm/ConfirmPromptButton';
import { ConfirmPromptButtonGroup } from '../../src/prompts/Confirm/ConfirmPromptButtonGroup';

import { MyPalette } from './MyPalette';
import { Test } from './Test';

const Message = styled.p`
  margin: 0;
  padding: 0.75em 0.75em 0;
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
          //     <ConfirmPromptButtonGroup>
          //       <ConfirmButtonYes />
          //       <ConfirmButtonNo />
          //     </ConfirmPromptButtonGroup>
          //   </>
          // )}
        />,
      ]}
    />
    // </Test>
  );
};
