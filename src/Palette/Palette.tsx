import * as React from 'react';
import * as tb from 'ts-toolbelt';

import {
  ComponentsProvider,
  ComponentsProviderProps,
} from '../contexts/components';
import { PromptPipe, ResolvableComponent } from '../types/ResolvableComponent';

import { Prompt } from './Prompt';
import { PaletteContext } from './context';
import * as duck from './duck';

type ComponentsProp = Pick<ComponentsProviderProps, 'components'>;
export interface PaletteProps<T extends tb.L.List<ResolvableComponent>>
  extends ComponentsProp {
  openOn: string;
  prompt: PromptPipe<T>;
}

interface PaletteComponent {
  <T extends tb.L.List<ResolvableComponent>>(
    props: PaletteProps<T>,
  ): React.ReactElement | null;
  displayName?: string;
}

export const Palette: PaletteComponent = ({ components, openOn, prompt }) => {
  const [state, dispatch] = React.useReducer(duck.reducer, prompt, duck.init);
  const context = React.useMemo(() => ({ dispatch, state }), [state]);

  return (
    <ComponentsProvider components={components}>
      <PaletteContext.Provider value={context}>
        <Prompt openOn={openOn} />
      </PaletteContext.Provider>
    </ComponentsProvider>
  );
};
