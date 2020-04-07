import * as React from 'react';
import styled from 'styled-components';

import { Palette, PaletteProps } from '../src/Palette';
import { ResolvableComponent } from '../src/types/ResolvableComponent';

import { HotKey } from './HotKey';
import { useTheme } from './theme';

const Card = styled.article`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr auto;
  padding: 1em;
`;

const Summary = styled.p`
  margin: 0;
`;

export interface PaletteStoryProps
  extends PaletteProps<readonly ResolvableComponent[]> {
  summary: React.ReactNode;
}

export const PaletteStory: React.FC<PaletteStoryProps> = ({
  summary,
  ...props
}) => {
  const [key, theme] = useTheme();
  const { openOn } = props;

  return (
    <Card>
      <Summary>{summary}</Summary>
      <span>
        <HotKey>{openOn}</HotKey>
      </span>
      <Palette components={theme} key={key} {...props} />
    </Card>
  );
};
