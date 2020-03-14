import styled, { css } from 'styled-components';

import { fontFamily } from './constants';

const layout = css`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

export const TokenGroup = styled.div`
  ${layout} /* NOTE: keeping this off, to test that inline-block works */
  --gap: 0.25em;
  background-color: white;
  box-sizing: border-box;
  color: rgb(89, 89, 89);
  font-family: ${fontFamily};
  /* font-size: 16px; */
  margin-bottom: 0.5em;
  /* TODO: maybe move '1.5(em)' to constants? */
  min-height: calc(var(--gap) * 4 + 1.5em);
`;
