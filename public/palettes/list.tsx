import * as React from 'react';
import styled from 'styled-components';

import { List } from '../../src/prompts/List';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Ctn = styled.div`
  background-color: white;
  background-color: rgb(243, 243, 243); /* TODO: remove */
  box-shadow: rgb(168, 168, 168) 0px 5px 8px;
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

export const list = [
  <List
    as={Ctn}
    key="1"
    message="List your favorite ____"
    // render={async () => {
    //   await wait(800);
    //   return (
    //     <>
    //       <Message>Are you sure?</Message>
    //       <ButtonGroup>
    //         <ConfirmButtonYes as={ConfirmButton}>Ye</ConfirmButtonYes>
    //         <ConfirmButtonNo as={ConfirmButton}>Nah</ConfirmButtonNo>
    //       </ButtonGroup>
    //     </>
    //   );
    // }}
    resolve={value => {
      console.log('#1', value);
    }}
  />,
  <List
    as={Ctn}
    key="2"
    resolve={value => {
      console.log('#2', value);
    }}
  />,
  <List
    initialValue={async () => {
      await wait(400);
      return ['a', '', 'c'];
    }}
    key="3"
    resolve={value => {
      console.log('#3', value);
    }}
  />,
  <List
    initialValue={async () => {
      await wait(400);
      return [];
    }}
    key="4"
    message="Message text here"
    renderProgress={() => <Progress>Loading text here</Progress>}
    resolve={value => {
      console.log('#4', value);
    }}
  />,
  <List
    key="5"
    message={async () => {
      throw new Error('Could not retrieve message');
    }}
    resolve={value => {
      console.log('#5', value);
    }}
  />,
];
