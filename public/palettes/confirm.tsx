import * as React from 'react';
import styled from 'styled-components';

import { Confirm } from '../../src/prompts/Confirm';
import {
  ConfirmButtonNo,
  ConfirmButtonYes,
} from '../../src/prompts/Confirm/ConfirmButton';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Ctn = styled.div`
  background-color: white;
  box-shadow: rgb(168, 168, 168) 0px 5px 8px;
`;

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

const Progress = styled(Message)`
  margin: 1em;
`;

interface ConfirmButtonProps {
  focused: boolean;
}

// background-color: ${props => props.focused ? 'rgb(214, 235, 255)' : 'rgb(224, 224, 224)'};
// box-shadow: ${props => props.focused ? 'inset 0 0 0 0.25em rgba(0, 122, 204, 0.4)' : ''};

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

export const confirm = [
  <Confirm
    as={Ctn}
    key="1"
    render={async () => {
      await wait(800);
      return (
        <>
          <Message>Are you sure?</Message>
          <ButtonGroup>
            <ConfirmButtonYes as={ConfirmButton}>Ye</ConfirmButtonYes>
            <ConfirmButtonNo as={ConfirmButton}>Nah</ConfirmButtonNo>
          </ButtonGroup>
        </>
      );
    }}
    resolve={value => {
      console.log('#1', value);
    }}
  />,
  <Confirm
    as={Ctn}
    key="2"
    initialValue={true}
    resolve={value => {
      console.log('#2', value);
    }}
  />,
  <Confirm
    as={Ctn}
    key="3"
    message="Message text here"
    resolve={value => {
      console.log('#3', value);
    }}
  />,
  <Confirm
    as={Ctn}
    key="4"
    render={
      <>
        <Message>Sync</Message>
        <ButtonGroup>
          <ConfirmButtonYes as={ConfirmButton} />
          <ConfirmButtonNo as={ConfirmButton} />
        </ButtonGroup>
      </>
    }
    resolve={value => {
      console.log('#4', value);
    }}
  />,
  <Confirm
    as={Ctn}
    key="5"
    render={async () => {
      await wait(400);
      throw new Error('Uh oh');
    }}
    renderProgress={() => <Progress>... ... ... ...</Progress>}
    resolve={value => {
      console.log('#5', value);
    }}
  />,
];
