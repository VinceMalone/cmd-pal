import * as React from 'react';
import styled from 'styled-components';

import { useHotkeys } from '../../utils/useHotKeys';

import { useExperimentsContext } from './context';
import { Experiments, ExperimentValues } from './experiments';

const Fields = styled.fieldset`
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-bottom: none;
  color: rgba(0, 0, 0, 0.67);
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
  margin: 0;
  padding: 0.5em 0.5em 0;
`;

const Heading = styled.legend`
  padding: 0 0.5em;
`;

const Field = styled.label`
  border-bottom: 1px solid rgba(0, 0, 0, 0.24);
  display: block;
  margin: 0 -0.5em 0;
  padding: 1em;
`;

const Label = styled.span`
  display: block;
  font-family: monospace;
  margin-bottom: 0.25em;
`;

interface ExperimentFieldsProps {}

const ExperimentFields: React.FC<ExperimentFieldsProps> = () => {
  const { experiments, set } = useExperimentsContext();

  const list = Object.entries(experiments).map(
    ([name, { options, value }]) => ({
      name: name as keyof Experiments,
      options: options as readonly string[],
      value,
    }),
  );

  const handleChange = <K extends keyof Experiments>(
    name: K,
    value: string,
  ) => {
    set([name, value as ExperimentValues[K]]);
  };

  return (
    <Fields>
      <Heading>Experiments</Heading>
      {list.map(({ name, options, value }) => (
        <Field key={name}>
          <Label>{name}</Label>
          <select
            onChange={evt => handleChange(name, evt.target.value)}
            value={value}
          >
            {options.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
      ))}
    </Fields>
  );
};

export interface ExperimentSettingsProps {
  defaultOpened?: boolean;
  openOn?: string;
}

export const ExperimentSettings: React.FC<ExperimentSettingsProps> = ({
  defaultOpened = false,
  openOn = 'option+,',
}) => {
  const [opened, setOpened] = React.useState(defaultOpened);

  useHotkeys(
    openOn,
    React.useCallback(() => setOpened(x => !x), []),
  );

  return <>{opened && <ExperimentFields />}</>;
};
