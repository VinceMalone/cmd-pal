import * as React from 'react';
import styled from 'styled-components';

import { Directions } from '../Directions';
import { HotKey } from '../HotKey';

const Title = styled.h1`
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 2em;
  line-height: 1.5;
  margin: 1.5em auto;
  text-align: center;
`;

export interface TestProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

export const Test: React.FC<TestProps> = ({ children, title }) => {
  return (
    <>
      <Title>{title}</Title>
      <Directions>
        Press <HotKey>Option+Shift+P</HotKey> to open and <HotKey>Esc</HotKey>{' '}
        to close.
      </Directions>
      {children}
    </>
  );
};
