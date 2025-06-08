import { useContext, useEffect } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';
import { useColorScheme } from '@mui/joy';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const { setMode } = useColorScheme();

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setMode(newTheme === Theme.DARK ? 'dark' : 'light');
    setTheme!(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme as string);
  }, [theme]);

  return {
    theme: theme!,
    toggleTheme,
  };
}
