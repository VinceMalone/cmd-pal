import styled, { css } from 'styled-components';

import { gapProp } from '../../src/components/base/TokenField';

import { accent2 } from './colors';
import { body, dark } from './typography';

const layout = css`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

export const TokenGroup = styled.div`
  ${body}
  ${dark}
  ${layout} /* NOTE: keeping this off, to test that inline-block works */
  ${gapProp}: 0.25em;
  background-color: white;
  box-sizing: border-box;
  margin: 0.25em;
  min-height: calc(var(${gapProp}) * 4 + 1.5em);
  outline: ${accent2} solid 1px;
  outline-offset: -1px;
`;
