import * as React from 'react';
import styled from 'styled-components';

import { List } from '../../src/prompts/List';
// import { XXX } from '../../src/prompts/List/XXX';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Ctn = styled.div`
  background-color: white;
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
];
