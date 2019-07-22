import hotkeys, { KeyHandler } from 'hotkeys-js';
import { useEffect } from 'react';

export default function useHotkeys(keys: string, handler: () => void) {
  useEffect(() => {
    const handle: KeyHandler = evt => {
      evt.preventDefault();
      handler();
    };

    hotkeys.filter = () => true;

    hotkeys(keys, handle);

    return () => {
      hotkeys.unbind(keys, handle);
    };
  }, [handler, keys]);
}
