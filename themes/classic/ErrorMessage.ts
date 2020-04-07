import styled from 'styled-components';

export const ErrorMessage = styled.p`
  margin: 0;
  padding: 0.75em;

  &::before {
    content: '⚠️ ';
  }
`;
