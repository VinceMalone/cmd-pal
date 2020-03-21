import * as React from 'react';

import { usePaletteContext } from '../contexts/palette';
import { Resolvable } from '../types/Resolvable';
import { call } from '../utils/call';

export interface ResolvablesProps<T extends Record<string, unknown>, In> {
  children(results: T): React.ReactNode;
  fallback: () => React.ReactNode;
  input: In;
  resolvables: {
    [P in keyof T]: Resolvable<T[P], [In]>;
  };
}

export const Resolvables = <T extends Record<string, unknown>, In>({
  children,
  fallback,
  input,
  resolvables,
}: ResolvablesProps<T, In>): React.ReactElement | null => {
  const { state } = usePaletteContext();

  const resolvablesRef = React.useRef(resolvables);
  const [results, setResults] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setResults(null);
    let mounted = true;

    (async () => {
      try {
        const resolved = Object.fromEntries(
          await Promise.all(
            Object.entries(resolvablesRef.current).map(
              async ([k, v]) => [k, await call(v, input)] as const,
            ),
          ),
        ) as T;

        if (mounted) {
          setResults(resolved);
        }
      } catch (err) {
        setError(err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [input]);

  if (error !== null) {
    throw new Error(error.message);
  }

  return (
    <>{state.isPending || results === null ? fallback() : children(results)}</>
  );
};
