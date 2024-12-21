import type { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ThemeSelector.module.sass';
import { useTheme } from 'shared/config/theme/useTheme';
import LightIcon from 'shared/assets/icons/light-icon.svg?react';
import MoonIcon from 'shared/assets/icons/moon-icon.svg?react';
import { Theme } from 'shared/config/theme/ThemeContext';
import { Button } from 'shared/ui/Button/ui/Button';

interface ThemeSelectorProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const ThemeSelector: FC<ThemeSelectorProps> = ({ className, ...props }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button className={classNames(cls.ThemeSelector, { additional: [className] })} onClick={toggleTheme} {...props}>
      {theme === Theme.LIGHT && <LightIcon className={cls.icon} />}
      {theme === Theme.DARK && <MoonIcon className={cls.icon} />}
    </Button>
  );
};
