import { createContext } from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark-theme',
}

export interface ThemeContextProp {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProp>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
