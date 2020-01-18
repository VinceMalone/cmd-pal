import * as React from 'react';
import * as tb from 'ts-toolbelt';

import { Resolvable } from '../../../typings/Component';

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

export interface PaletteProviderProps {
  children?: React.ReactNode;
  pipe: tb.L.List<Resolvable>;
}

export const PaletteProvider: React.FC<PaletteProviderProps> = ({
  children,
  pipe,
}) => {
  const [state, dispatch] = React.useReducer(duck.reducer, pipe, duck.init);
  const context = React.useMemo(() => ({ dispatch, state }), [state]);

  return (
    <PaletteContext.Provider value={context}>
      {children}
    </PaletteContext.Provider>
  );
};
