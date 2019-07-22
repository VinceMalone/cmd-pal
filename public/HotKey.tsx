import * as React from 'react';
import styled from 'styled-components';

const Kbd = styled.kbd`
  background-color: #eee;
  border-radius: 3px;
  border: 1px solid #b4b4b4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
  color: #333;
  display: inline-block;
  font-size: 0.85em;
  font-weight: 700;
  line-height: 1;
  padding: 2px 4px;
  white-space: nowrap;
`;

export const HotKey = ({ children }: { children: string }) => (
  <>
    {children.split('+').map((key, index) => (
      <React.Fragment key={key}>
        {index > 0 && <span> + </span>}
        <Kbd>{key}</Kbd>
      </React.Fragment>
    ))}
  </>
);
