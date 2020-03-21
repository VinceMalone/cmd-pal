import * as React from 'react';

import { Palette, PaletteProps } from '../src/Palette';
// TODO: ensures the [base] prompt styles are imported before theme styles
import '../src/prompts/Confirm';
import '../src/prompts/List';
import '../src/prompts/MultiChoice';
import '../src/prompts/SingleChoice';
import '../src/prompts/Text';
import { ResolvableComponent } from '../src/types/ResolvableComponent';
import * as vscode from '../themes/vscode';

import { Directions } from './Directions';
import { HotKey } from './HotKey';
import * as palettes from './palettes';

type ThemedPaletteProps = Omit<
  PaletteProps<readonly ResolvableComponent[]>,
  'components' | 'theme'
>;

const VSCodePalette: React.FC<ThemedPaletteProps> = props => (
  <Palette components={vscode.components} theme={vscode.theme} {...props} />
);

export const App = () => (
  <>
    <Directions>
      Press <HotKey>Option+Shift+P</HotKey> to open (or{' '}
      <HotKey>Alt+Shift+P</HotKey> on Windows)
      <br />
      and <HotKey>Esc</HotKey> to close.
    </Directions>

    <VSCodePalette openOn="option+shift+6" prompt={palettes.list} />
    <VSCodePalette openOn="option+shift+5" prompt={palettes.confirm} />
    <VSCodePalette openOn="option+shift+4" prompt={palettes.multi} />
    <VSCodePalette openOn="option+shift+3" prompt={palettes.state} />
    <VSCodePalette openOn="option+shift+2" prompt={palettes.todo} />
    <VSCodePalette openOn="option+shift+1" prompt={palettes.commands} />
    <VSCodePalette openOn="option+shift+p" prompt={palettes.workflow} />
  </>
);
