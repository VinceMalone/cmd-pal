interface Experiment<T extends readonly string[]> {
  options: T;
  value: T[number];
}

const createExperiment = <T extends readonly string[]>(
  experiment: Experiment<T>,
) => experiment;

export const experiments = {
  FILTER_ALGORITHM: createExperiment({
    options: ['CDT', 'VSC'] as const,
    value: 'VSC',
  }),
  FILTER_VALUE_AFTER_SELECTION: createExperiment({
    options: ['KEEP', 'CLEAR', 'CLEAR_AND_SCROLL'] as const,
    value: 'KEEP',
  }),
  FOCUS_TOKENS_WITH_FILTER: createExperiment({
    options: ['PREVENT', 'ALLOW', 'ALLOW_BUT_PREVENT_REPEAT'] as const,
    value: 'ALLOW_BUT_PREVENT_REPEAT',
  }),
  ON_ESCAPE: createExperiment({
    options: [
      'CLOSE',
      'CLEAR_ALL > CLOSE',
      'CLEAR_FILTER > CLOSE',
      'CLEAR_FILTER > CLEAR_TOKENS > CLOSE',
    ] as const,
    value: 'CLEAR_FILTER > CLEAR_TOKENS > CLOSE',
  }),
  SUBMIT_MODIFIER: createExperiment({
    options: ['⇧', '⌃', '⌥', '⌘'] as const,
    value: '⌘',
  }),
  TOKEN_ORDER: createExperiment({
    options: ['TIME_OF_SELECTION', 'SAME_AS_LIST'] as const,
    value: 'TIME_OF_SELECTION',
  }),
} as const;

export type Experiments = typeof experiments;
export type ExperimentValues = {
  [P in keyof Experiments]: Experiments[P]['value'];
};
