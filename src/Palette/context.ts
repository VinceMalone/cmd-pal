import * as React from 'react';

import * as duck from './duck';

interface PaletteContextValue {
  dispatch: React.Dispatch<duck.Actions>;
  state: duck.State;
}

export const PaletteContext = React.createContext<PaletteContextValue>({
  dispatch: () => {
    throw new Error(`"Palette" context doesn't have a provider`);
  },
  state: duck.init([]),
});

export const usePaletteContext = () => React.useContext(PaletteContext);
