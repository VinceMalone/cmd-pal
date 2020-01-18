import { useEffect } from 'react';

export const useOnOutsideClick = (
  ref: React.RefObject<Node>,
  handler: (evt: UIEvent) => void,
): void => {
  useEffect(() => {
    const listener = (evt: UIEvent) => {
      if (ref.current != null && !ref.current.contains(evt.target as Node)) {
        handler(evt);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, ref]);
};