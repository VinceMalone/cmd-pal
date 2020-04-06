import styled from 'styled-components';

export const Button = styled.button<{ focused: boolean }>`
  background-color: #ccc;
  border: none;
  border-radius: 0.1875em;
  box-shadow: ${props =>
    props.focused ? '0 0 0 0.25em rgba(0, 122, 204, 0.4)' : ''};
  box-sizing: border-box;
  color: rgb(58, 58, 58);
  display: inline-block;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.25em;
  margin: 0;
  outline: none;
  padding: 0.125em 0.375em;
`;
