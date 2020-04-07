import * as React from 'react';

import { Components } from '../src/contexts/components/type';
import * as namely from '../themes/namely';
import * as vscode from '../themes/vscode';
import * as win95 from '../themes/win95';

export const themes: Record<string, Partial<Components>> = {
  none: {},
  namely: namely.components,
  vscode: vscode.components,
  win95: win95.components,
};

const ThemeContext = React.createContext<
  [
    keyof typeof themes,
    React.Dispatch<React.SetStateAction<keyof typeof themes>>,
  ]
>(['none', () => undefined]);

export const useTheme = (): [string, Partial<Components>] => {
  const [theme] = React.useContext(ThemeContext);
  return [theme, themes[theme]];
};

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState<keyof typeof themes>('vscode');

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export interface ThemeControlProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const ThemeControl: React.FC<ThemeControlProps> = props => {
  const [theme, setTheme] = React.useContext(ThemeContext);

  return (
    <select
      {...props}
      onChange={evt => setTheme(evt.target.value as keyof typeof themes)}
      value={theme}
    >
      {Object.keys(themes).map(name => (
        <option key={name}>{name}</option>
      ))}
    </select>
  );
};
