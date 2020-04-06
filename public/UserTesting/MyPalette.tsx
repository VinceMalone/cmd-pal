import * as React from 'react';

import { Palette, PaletteProps } from '../../src/Palette';
import { ResolvableComponent } from '../../src/types/ResolvableComponent';
import * as vscode from '../../themes/vscode';
// import * as win95 from '../../themes/win95';

export type MyPaletteProps = PaletteProps<readonly ResolvableComponent[]>;

export const MyPalette: React.FC<MyPaletteProps> = props => (
  <Palette components={vscode.components} theme={vscode.theme} {...props} />
);
