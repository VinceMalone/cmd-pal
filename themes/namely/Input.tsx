import styled from 'styled-components';

import { fontFamily } from './constants';

export const Input = styled.input`
  /* vscode */
  background-color: white;
  border: none;
  color: rgb(97, 97, 97);
  font-size: 1rem;
  line-height: 1.375;
  padding: 0.3125rem 0.5rem;

  /* namely */
  border: 1px solid #c1c5c8;
  border-radius: 3px;
  color: #2a3742;
  font-family: ${fontFamily};
  margin: 0.5rem;
  padding: 0.5rem calc(1rem - 1px);
  width: calc(100% - 1rem);

  /* overrides */
  width: calc(100% - 1rem) !important;
  padding: 0.5rem calc(1rem - 1px) !important;

  ::placeholder {
    color: #767676;
  }

  :focus {
    outline-color: rgba(0, 122, 204, 0.4);
    outline-offset: -1px;
    outline-style: solid;
    outline-width: 1px;

    border-color: #006dd4;
    box-shadow: inset 0 0 0 1px #006dd4;
    outline: none;
  }
`;
