import styled from 'styled-components';

export const Input = styled.input`
  background-color: white;
  border: none;
  color: rgb(97, 97, 97);
  font-size: 13px;
  /* line-height: 1.375; */
  /* padding: 0.3125rem 0.5rem; */
  padding: 4px;

  margin: 6px;
  width: calc(100% - 12px);

  ::placeholder {
    color: #767676;
  }

  :focus {
    outline-color: rgba(0, 122, 204, 0.4);
    outline-offset: -1px;
    outline-style: solid;
    outline-width: 1px;
  }
`;
