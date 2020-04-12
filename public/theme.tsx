import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffectOnce } from 'react-use';

import { Components } from '../src/contexts/components/type';
import * as classic from '../themes/classic';
import * as neon from '../themes/neon';
import * as win95 from '../themes/win95';

export const themes: Record<string, Partial<Components>> = {
  none: {},
  classic: classic.components,
  neon: neon.components,
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
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const initialTheme = query.get('theme') as keyof typeof themes;
  const defaultTheme = 'classic';
  const [theme, setTheme] = React.useState<keyof typeof themes>(
    initialTheme ?? defaultTheme,
  );

  useEffectOnce(() => {
    if (initialTheme == null) {
      history.replace({ search: `theme=${defaultTheme}` });
    }
  });

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export interface ThemeControlProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const ThemeControl: React.FC<ThemeControlProps> = props => {
  const history = useHistory();
  const [theme, setTheme] = React.useContext(ThemeContext);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    history.push({ search: `theme=${value}` });
    setTheme(value as keyof typeof themes);
  };

  return (
    <select {...props} onChange={handleChange} value={theme}>
      {Object.keys(themes).map(name => (
        <option key={name}>{name}</option>
      ))}
    </select>
  );
};
