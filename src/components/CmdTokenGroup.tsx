import * as React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  --cmd-pal--token-gap: 0.1em;
  padding: var(--cmd-pal--token-gap);
  margin: calc(var(--cmd-pal--token-gap) * -2);
`;

export interface CmdTokenGroupProps {
  as?: React.ComponentType<{}>;
  children?: React.ReactNode;
}

export const CmdTokenGroup: React.FC<CmdTokenGroupProps> = ({
  as,
  children,
}) => <Group as={as}>{children}</Group>;
