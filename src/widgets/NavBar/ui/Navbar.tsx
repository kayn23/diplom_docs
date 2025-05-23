import { memo, type FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { BaseLink } from 'shared/ui/BaseLink/BaseLink';
import { ThemeSelector } from 'widgets/ThemeSelector';
import { LangSelector } from 'widgets/LangSelector';
import { useTranslation } from 'react-i18next';
import { AuthButton } from './AuthButton';
import { GeneralPageLink } from '../GeneralPageLink';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.Navbar, { additional: [className] })}>
      <nav className={classNames(cls.navigation)}>
        <LangSelector />
        <ThemeSelector />
        <GeneralPageLink />
        <BaseLink
          className={cls.link}
          to="/about"
        >
          {t('navbar.about')}
        </BaseLink>
        <AuthButton />
      </nav>
    </div>
  );
});
