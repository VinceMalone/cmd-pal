import * as React from 'react';
import styled from 'styled-components';

// TODO: should this be called `VisualCheckbox`?

const CheckmarkSvg = styled.svg`
  fill: currentColor;
  height: 1em;
  transform: scale(1.2);
  width: 1em;
`;

const Box = styled.div<VisualCheckboxProps>`
  align-items: center;
  background-clip: content-box;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.26);
  border-radius: 0.125em;
  box-sizing: border-box;
  display: inline-flex;
  height: 1em;
  justify-content: center;
  margin: 0.25em 0;
  margin-inline-end: 0.5em;
  vertical-align: top;
  width: 1em;
`;

export interface VisualCheckboxProps {
  checked?: boolean;
}

export const VisualCheckbox: React.FC<VisualCheckboxProps> = ({
  checked = false,
}) => (
  <Box checked={checked}>
    {checked && (
      <CheckmarkSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </CheckmarkSvg>
    )}
  </Box>
);

// export const VisualCheckbox = styled.input.attrs(() => ({
//   readOnly: true,
//   tabIndex: -1,
//   type: 'checkbox',
// }))`
//   cursor: inherit;
//   font-size: inherit;
//   height: 1em;
//   margin: 0;
//   margin-inline-end: 0.5em;
//   outline: none;
// `;
