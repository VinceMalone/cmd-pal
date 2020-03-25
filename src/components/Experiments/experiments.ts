interface Experiment<T extends readonly string[]> {
  options: T;
  value: T[number];
}

const createExperiment = <T extends readonly string[]>(
  experiment: Experiment<T>,
) => experiment;

export const experiments = {
  FOCUS_TOKENS_WITH_FILTER: createExperiment({
    options: ['PREVENT', 'ALLOW', 'ALLOW_BUT_PREVENT_REPEAT'] as const,
    value: 'ALLOW_BUT_PREVENT_REPEAT',
  }),
  // TOKEN_ORDER: createExperiment({
  //   options: ['TIME_OF_SELECTION', 'SAME_AS_LIST'] as const,
  //   value: 'TIME_OF_SELECTION',
  // }),
} as const;

export type Experiments = typeof experiments;
export type ExperimentValues = {
  [P in keyof Experiments]: Experiments[P]['value'];
};
