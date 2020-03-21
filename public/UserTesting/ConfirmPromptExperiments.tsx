import * as React from 'react';
import styled from 'styled-components';

import { Confirm } from '../../src/prompts/Confirm';
import {
  ConfirmButtonNo,
  ConfirmButtonYes,
} from '../../src/prompts/Confirm/ConfirmButton';

import { MyPalette } from './MyPalette';
import { Test } from './Test';

const ButtonGroup = styled.div`
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr 1fr;
  padding: 1em;
`;

const Message = styled.div`
  color: rgb(97, 97, 97);
  cursor: default;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 16px;
  margin: 1em 1em 0;
`;

interface ConfirmButtonProps {
  focused: boolean;
}

const ConfirmButton = styled.button<ConfirmButtonProps>`
  background-color: #ccc;
  border: none;
  border-radius: 0.1875em;
  box-shadow: ${props =>
    props.focused ? '0 0 0 0.25em rgba(0, 122, 204, 0.4)' : ''};
  box-sizing: border-box;
  color: rgb(58, 58, 58);
  display: inline-block;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.25em;
  margin: 0;
  outline: none;
  padding: 0.125em 0.375em;
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
          render={() => (
            <>
              <Message>Are you sure?</Message>
              <ButtonGroup>
                <ConfirmButtonYes as={ConfirmButton} />
                <ConfirmButtonNo as={ConfirmButton} />
              </ButtonGroup>
            </>
          )}
        />,
      ]}
    />
    // </Test>
  );
};
