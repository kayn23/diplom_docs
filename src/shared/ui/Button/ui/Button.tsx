import type { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonTheme = 'clear';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
}

export const Button: FC<ButtonProps> = ({ className, theme = 'clear', children, ...props }) => {
  return (
    <button className={classNames(cls.button, { additional: [className, cls[theme]] })} {...props}>
      {children}
    </button>
  );
};
