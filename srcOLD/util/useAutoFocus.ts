import { useEffect } from 'react';

export const useAutoFocus = (
  ref: React.RefObject<HTMLElement>,
  flag: boolean,
): void => {
  useEffect(() => {
    if (flag && ref.current != null) {
      ref.current.focus();
    }
  }, [flag, ref]);
};
