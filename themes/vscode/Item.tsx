import styled from 'styled-components';

import { fontFamily } from './constants';

export const Item = styled.div`
  align-items: center;
  background-color: transparent;
  color: rgb(97, 97, 97);
  cursor: pointer;
  display: flex;
  font-family: ${fontFamily};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
  padding: 0 0.75em;

  /* MultiChoice: */
  display: grid;
  gap: 0.5em;
  grid-auto-flow: column;
  justify-content: start;

  :hover {
    background-color: #e8e8e8;
  }

  &[aria-selected='true'] {
    background-color: #d6ebff;
  }
`;
