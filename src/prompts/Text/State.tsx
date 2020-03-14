import { Result } from 'use-resolved';

import { usePaletteContext } from '../../contexts/palette';

// TODO: dead... remove this

export interface StateProps<T extends Record<string, unknown>> {
  children: (values: T) => JSX.Element;
  errorFallback: (error: Error) => JSX.Element;
  pendingFallback: () => JSX.Element;
  results: { [P in keyof T]: Result<T[P]> };
}

export const State = <T extends Record<string, unknown>>({
  children,
  errorFallback,
  pendingFallback,
  results,
}: StateProps<T>): JSX.Element => {
  const { state } = usePaletteContext();

  const values = Object.values(results);
  const error = values.find(x => x.error)?.error;

  if (error != null) {
    return errorFallback(error);
  }

  if (state.isPending || values.some(x => x.pending)) {
    return pendingFallback();
  }

  return children(
    Object.fromEntries(
      Object.entries(results).map(([k, v]) => [k, v.value]),
    ) as T,
  );
};
