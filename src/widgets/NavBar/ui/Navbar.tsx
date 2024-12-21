import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.sass';
import { BaseLink } from 'shared/ui/BaseLink/BaseLink';
import { ThemeSelector } from 'widgets/ThemeSelector';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <div className={classNames(cls.Navbar, { additional: [className] })}>
      <nav className={classNames(cls.navigation)}>
        <ThemeSelector />
        <BaseLink className={cls.link} to="/">
          Home
        </BaseLink>
      </nav>
    </div>
  );
};
