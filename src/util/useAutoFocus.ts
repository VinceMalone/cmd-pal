import { useEffect } from 'react';

export default function useAutoFocus(ref: React.RefObject<HTMLElement>, flag: boolean) {
  useEffect(() => {
    if (flag && ref.current != null) {
      ref.current.focus();
    }
  }, [flag, ref]);
}
