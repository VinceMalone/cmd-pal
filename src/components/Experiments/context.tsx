import * as React from 'react';

import { Experiments, ExperimentValues, experiments } from './experiments';

interface ExperimentsContextValue {
  experiments: Experiments;
  set<T extends keyof Experiments>([name, value]: [
    T,
    ExperimentValues[T],
  ]): void;
}

const ExperimentsContext = React.createContext<ExperimentsContextValue>({
  experiments,
  set: () => undefined, // TODO
});

export const useExperimentsContext = () => React.useContext(ExperimentsContext);

const setValue = <K extends keyof Experiments>(
  settings: Experiments,
  [name, value]: [K, ExperimentValues[K]],
) => ({
  ...settings,
  [name]: { ...settings[name], value },
});

const mergeValues = ({
  source,
  values,
}: {
  source: Experiments;
  values: Partial<ExperimentValues>;
}) => {
  const result: Record<string, object> = { ...source };
  for (const [name, value] of Object.entries(values)) {
    if (value != null) {
      result[name] = {
        ...result[name],
        value,
      };
    }
  }
  return result as Experiments;
};

export interface ExperimentsProps {
  children?: React.ReactNode;
  initialValues?: Partial<ExperimentValues>;
}

export const ExperimentsProvider: React.FC<ExperimentsProps> = ({
  children,
  initialValues = {},
}) => {
  const source = useExperimentsContext().experiments;
  const [experiments, set] = React.useReducer(
    setValue,
    {
      source,
      values: initialValues,
    },
    mergeValues,
  );
  const context = React.useMemo(() => ({ experiments, set }), [experiments]);

  return (
    <ExperimentsContext.Provider value={context}>
      {children}
    </ExperimentsContext.Provider>
  );
};
