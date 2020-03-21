import styled from 'styled-components';

import { accent1 } from './colors';
import { body, dark } from './typography';

export const Item = styled.div`
  ${body}
  ${dark}
  /* align-items: center; */
  background-color: transparent;
  cursor: pointer;
  /* display: flex; */
  padding: 0 0.75em;

  /* MultiChoice: */
  /* display: grid;
  gap: 0.5em;
  grid-auto-flow: column;
  justify-content: start; */

  :hover {
    background-color: #e8e8e8;
  }

  &[aria-selected='true'] {
    background-color: ${accent1};
    outline: none;
  }
`;
