import styled from 'styled-components';

import { accent2 } from './colors';
import { body, dark } from './typography';

const outsideSpacing = 0.25;

export const Textbox = styled.input`
  ${body}
  ${dark}
  background-color: white;
  border: none;
  height: 2em;
  margin: ${outsideSpacing}em;
  padding: 0 0.5em;
  width: calc(100% - ${outsideSpacing * 2}em);

  ::placeholder {
    color: rgba(0, 0, 0, 0.54);
  }

  :focus {
    outline: ${accent2} solid 1px;
    outline-offset: -1px;
  }
`;
