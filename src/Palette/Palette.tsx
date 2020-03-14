import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import * as tb from 'ts-toolbelt';

import { ComponentsProvider } from '../contexts/components';
import { PromptPipe, ResolvableComponent } from '../types/ResolvableComponent';

import { Prompt } from './Prompt';
import { PaletteContext } from './context';
import * as duck from './duck';

export interface PaletteProps<T extends tb.L.List<ResolvableComponent>> {
  components: any; // TODO
  openOn: string;
  prompt: PromptPipe<T>;
  theme: any; // TODO
}

interface PaletteComponent {
  <T extends tb.L.List<ResolvableComponent>>(
    props: PaletteProps<T>,
  ): React.ReactElement | null;
  displayName?: string;
}

export const Palette: PaletteComponent = ({
  components,
  openOn,
  prompt,
  theme,
}) => {
  const [state, dispatch] = React.useReducer(duck.reducer, prompt, duck.init);
  const context = React.useMemo(() => ({ dispatch, state }), [state]);

  return (
    <ThemeProvider theme={theme}>
      <ComponentsProvider components={components}>
        <PaletteContext.Provider value={context}>
          <Prompt openOn={openOn} />
        </PaletteContext.Provider>
      </ComponentsProvider>
    </ThemeProvider>
  );
};
