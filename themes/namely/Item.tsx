import styled from 'styled-components';

import { fontFamily } from './constants';

export const Item = styled.div`
  background-color: transparent;
  /* color: rgb(97, 97, 97); */
  cursor: pointer;
  font-family: ${fontFamily};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  /* padding: 0 0.5rem; */

  color: #2a3742;
  padding: 0.25rem 1.5rem;

  :hover {
    /* background-color: #e8e8e8; */

    background-color: #f9f9f9;
    /* color: #2a3742; */
  }

  &[aria-selected='true'] {
    /* background-color: #d6ebff; */

    background-color: #e5f4fb;
    /* color: #0e3e6b; */
  }
`;
