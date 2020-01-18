import * as React from 'react';

export const useAutoFocus = (
  ref: React.RefObject<HTMLElement>,
  flag: boolean,
): void => {
  React.useEffect(() => {
    if (flag && ref.current != null) {
      ref.current.focus();
    }
  }, [flag, ref]);
};
