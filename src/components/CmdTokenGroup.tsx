import * as React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  --gap: 0.25em;
  padding: var(--gap);
`;

const GroupItem = styled.div`
  box-sizing: border-box;
  display: inline-block;
  max-width: 100%;
  padding: var(--gap);
`;

export interface CmdTokenGroupProps {
  as?: React.ComponentType<{}>;
  children?: React.ReactNode;
}

export const CmdTokenGroup: React.FC<CmdTokenGroupProps> = ({
  as,
  children,
}) => (
  <Group as={as}>
    {React.Children.map(children, child => (
      <GroupItem>{child}</GroupItem>
    ))}
  </Group>
);
