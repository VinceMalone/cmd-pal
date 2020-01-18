import * as React from 'react';
import * as tb from 'ts-toolbelt';

export const useCalled = <T, A>(value: T | ((arg: A) => T), arg: A): T =>
  React.useMemo(
    () => (typeof value === 'function' ? (value as (arg: A) => T)(arg) : value),
    [arg, value],
  );

interface Response<T> {
  error: unknown | null;
  pending: boolean;
  result: T;
}

export const useResolved = <T>(
  value: tb.M.Promisable<T>,
  defaultValue: T,
): Response<T> => {
  const defaultValueRef = React.useRef(defaultValue);
  const [state, setState] = React.useState<Response<T>>({
    error: null,
    pending: true,
    result: defaultValue,
  });

  React.useLayoutEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const result = await value;
        if (mounted) {
          setState({
            error: null,
            pending: false,
            result: result,
          });
        }
      } catch (error) {
        if (mounted) {
          setState({
            error,
            pending: false,
            result: defaultValueRef.current,
          });
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [value]);

  return state;
};
