import * as React from 'react';
import styled from 'styled-components';

const Stack = styled.div`
  display: grid;
  gap: 1em;
  grid-auto-flow: row;
`;

const Title = styled.h1`
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 2em;
  line-height: 1.5;
  margin: 0;
  padding: 1em 0 0.5em;
`;

export interface DemoProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

export const Demo: React.FC<DemoProps> = ({ children, title }) => {
  return (
    <section>
      <Title>{title}</Title>
      <Stack>{children}</Stack>
    </section>
  );
};
