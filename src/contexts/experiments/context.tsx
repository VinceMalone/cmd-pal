import * as React from 'react';

import { Experiments } from '../../types/Experiments';

import * as duck from './duck';

interface ExperimentsContextValue {
  // dispatch: React.Dispatch<duck.Actions>;
  // state: duck.State;
  <K extends keyof Experiments>(experiment: K, flag: Experiments[K]): boolean;
}

export const ExperimentsContext = React.createContext<ExperimentsContextValue | null>(
  null,
);

//

export const useExperiments = () => {
  const context = React.useContext(ExperimentsContext);
  if (context === null) {
    throw new Error('useExperiments must be used inside a ExperimentsProvider');
  }
  return context;
};

//

export interface ExperimentsProviderProps {
  children?: React.ReactNode;
  experiments: Experiments;
}

export const ExperimentsProvider: React.FC<ExperimentsProviderProps> = ({
  children,
  experiments,
}) => {
  // const [state, dispatch] = React.useReducer(
  //   duck.reducer,
  //   experiments,
  //   duck.init,
  // );

  const context = React.useCallback(
    <K extends keyof Experiments>(experiment: K, flag: Experiments[K]) =>
      experiments[experiment] === flag,
    [experiments],
  );

  return (
    <ExperimentsContext.Provider value={context}>
      {children}
    </ExperimentsContext.Provider>
  );
};
