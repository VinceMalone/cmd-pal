import * as React from 'react';

import { useExperimentsContext } from './context';
import { Experiments, ExperimentValues } from './experiments';

export const useExperiments = () => {
  const { experiments } = useExperimentsContext();

  const experiment = React.useCallback(
    <K extends keyof Experiments>(name: K, value: ExperimentValues[K]) =>
      experiments[name].value === value,
    [experiments],
  );

  return {
    experiment,
  };
};
