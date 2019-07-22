import * as React from 'react';
import styled from 'styled-components';

import { useComponents } from '../util/components';

const Container = styled.div`
  position: fixed;
  right: ${props => props.theme.progressOffset};
  top: ${props => props.theme.progressOffset};
  z-index: ${props => props.theme.zIndex};
`;

export interface CmdProgressProps {
  summary: string | undefined;
}

export const CmdProgress = ({ summary }: CmdProgressProps) => {
  const { Progress } = useComponents();
  return <Container as={Progress}>{summary}</Container>;
};
