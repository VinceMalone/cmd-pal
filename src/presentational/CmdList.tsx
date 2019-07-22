import * as React from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

import { CommandItem } from '../../typings/Command';

import { useComponents } from '../util/components';
import { CmdItem } from './CmdItem';

const List = styled.div`
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
`;

export interface CmdListProps {
  activeDescendant: string | undefined;
  commands: CommandItem[];
  focusedIndex: number;
  onSelect: (index: number) => void;
}

export const CmdList = ({ activeDescendant, commands, focusedIndex, onSelect }: CmdListProps) => {
  const components = useComponents();

  const handleSelect = useCallback(
    id => {
      const index = commands.findIndex(cmd => cmd.id === id);
      onSelect(index);
    },
    [commands, onSelect],
  );

  return (
    <List aria-activedescendant={activeDescendant} as={components.List} role="tree" tabIndex={0}>
      {commands.length > 0 ? (
        commands.map((cmd, index) => (
          <CmdItem
            category={cmd.category}
            description={cmd.description}
            focused={index === focusedIndex}
            id={cmd.id}
            key={cmd.id}
            matches={cmd.matches}
            onSelect={handleSelect}
          />
        ))
      ) : (
        <CmdItem description="No commands matching" focused id="" onSelect={handleSelect} />
      )}
    </List>
  );
};
