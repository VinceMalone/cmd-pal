import * as React from 'react';

export const useOnOutsideClick = (
  elementRefs: React.RefObject<HTMLElement>[],
  handler: (evt: MouseEvent | TouchEvent) => void,
): void => {
  const elementsRef = React.useRef<React.RefObject<HTMLElement>[]>(elementRefs);
  elementsRef.current = elementRefs;

  React.useEffect(() => {
    const listener = (evt: MouseEvent | TouchEvent) => {
      if (
        elementsRef.current.every(
          ref => !ref.current?.contains(evt.target as Node),
        )
      ) {
        handler(evt);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener, { passive: true });

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);
};
