import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { BaseLink } from 'shared/ui/BaseLink/BaseLink';
import { ThemeSelector } from 'widgets/ThemeSelector';
import { LangSelector } from 'widgets/LangSelector';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.Navbar, { additional: [className] })}>
      <nav className={classNames(cls.navigation)}>
        <LangSelector />
        <ThemeSelector />
        <BaseLink className={cls.link} to="/">
          {t('navbar.home')}
        </BaseLink>
        <BaseLink className={cls.link} to="/about">
          {t('navbar.about')}
        </BaseLink>
      </nav>
    </div>
  );
};
