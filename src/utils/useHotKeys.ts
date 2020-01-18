import hotkeys, { KeyHandler } from 'hotkeys-js';
import * as React from 'react';

export const useHotkeys = (keys: string, handler: () => void): void => {
  React.useEffect(() => {
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
};
