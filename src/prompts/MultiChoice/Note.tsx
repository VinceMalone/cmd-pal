import styled from 'styled-components';

export const NoteContainer = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`;

export const Note = styled.div`
  font-size: 0.75em;
  text-align: end;

  code {
    font-size: larger;
  }
`;
