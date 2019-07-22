import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #e5e6e8;
  border-radius: 3px;
  box-shadow: 1px 1px 1px 0 #e5e6e8;
  display: flex;
  padding: 1rem;
`;

const Icon = styled.div`
  animation: ${rotate} 1s linear infinite;
  font-size: 1.5rem;
`;

const Svg = styled.svg`
  display: block;
  height: 1em;
  width: 1em;
`;

const Summary = styled.div`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  margin-left: 1rem;
`;

export const Progress = ({ children, ...props }: { children?: React.ReactNode }) => (
  <Container {...props}>
    <Icon>
      <Svg viewBox="0 0 167 155" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M90.169 41.094c-.743-.887-1.557-1.99-2.391-2.81-3.015-3.025-5.838-4.773-9.777-6.481-3.895-1.704-8.09-2.567-12.477-2.567-6.467 0-12.322 1.714-17.65 5.129-5.327 3.415-9.29 8.043-11.909 13.865L0 128.204 57.669 155l19.287-40.61c.75.941 1.586 2.175 2.463 3.035 3.015 3.025 5.685 4.561 9.684 6.255 4.034 1.728 8.242 2.575 12.669 2.575 6.423 0 12.208-1.748 17.334-5.278 5.143-3.509 9.085-8.181 11.909-14.002l35.895-79.927L109.483.356 90.169 41.094z"
          fill="#0F6BA7"
          fillRule="evenodd"
        />
      </Svg>
    </Icon>
    <Summary>{children}</Summary>
  </Container>
);
