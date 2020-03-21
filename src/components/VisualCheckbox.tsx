import * as React from 'react';
import styled from 'styled-components';

// TODO: this component sucks — stylistically and in implementation

const CheckmarkSvg = styled.svg`
  fill: currentColor;
  height: 1em;
  transform: scale(1.2);
  width: 1em;
`;

// TODO: move to theme
const Box = styled.div<{ checked: boolean }>`
  align-items: center;
  /* background-color: ${props => (props.checked ? 'white' : 'transparent')}; */
  border: 1px solid currentColor;
  border-radius: 0.125em;
  box-sizing: border-box;
  display: inline-flex;
  height: 1em;
  justify-content: center;
  width: 1em;
`;

//

const Input = styled.input`
  cursor: inherit;
  /* margin: 0; */ /* TODO: remove in theme */
  outline: none;
`;

export interface VisualCheckboxProps {
  checked?: boolean;
}

export const VisualCheckbox: React.FC<VisualCheckboxProps> = ({
  checked = false,
}) => <Input defaultChecked={checked} readOnly tabIndex={-1} type="checkbox" />;

// export const VisualCheckbox: React.FC<VisualCheckboxProps> = ({
//   checked = false,
// }) => (
//   <Box checked={checked}>
//     {checked && (
//       <CheckmarkSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//         <path d="M0 0h24v24H0z" fill="none" />
//         <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
//       </CheckmarkSvg>
//     )}
//   </Box>
// );
