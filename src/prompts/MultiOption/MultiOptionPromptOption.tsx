import * as React from 'react';

import { Mark } from '../../components/base/Mark';
import { Option } from '../../components/base/Option';
import { Match } from '../../types/List';

import { MultiOptionPromptCheckbox } from './MultiOptionPromptCheckbox';

export interface MultiOptionPromptOptionProps {
  focused: boolean;
  id: string;
  label: string;
  matches: Match[];
  onSelect(id: string): void;
  selected: boolean;
}

export const MultiOptionPromptOption: React.FC<MultiOptionPromptOptionProps> = ({
  focused,
  id,
  label,
  matches,
  onSelect,
  selected,
}) => {
  return (
    <Option id={id} label={label} onSelect={onSelect} selected={focused}>
      <MultiOptionPromptCheckbox checked={selected} />
      <Mark label={label} matches={matches} />
    </Option>
  );
};
