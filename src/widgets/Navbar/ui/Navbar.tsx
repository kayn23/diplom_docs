import { memo, useMemo, type FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { BaseLink } from 'shared/ui/BaseLink/BaseLink';
import { ThemeSelector } from 'widgets/ThemeSelector';
import { LangSelector } from 'widgets/LangSelector';
import { useTranslation } from 'react-i18next';
import { AuthButton } from './AuthButton';
import { GeneralPageLink } from '../GeneralPageLink';
import { getRouteWarehouseList } from 'shared/const/router';
import { Stack } from '@mui/joy';
import { useMobile } from 'shared/lib/useMobile/useMobile';
import { Logo } from 'features/Logo';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
  const { t } = useTranslation();
  const isMobile = useMobile();

  const link = useMemo(
    () => (
      <Stack
        direction="row"
        alignItems="center"
      >
        <GeneralPageLink />
        <BaseLink
          className={cls.link}
          to="/about"
        >
          {t('navbar.about')}
        </BaseLink>
        <BaseLink
          to={getRouteWarehouseList()}
          className={cls.Link}
        >
          {t('navbar.warehouses')}
        </BaseLink>
      </Stack>
    ),
    [t]
  );

  const hideLangSelector = false;

  return (
    <Stack
      direction={{ xs: 'row' }}
      className={classNames(cls.Navbar, { additional: [className] })}
    >
      <Logo />
      <nav className={classNames(cls.navigation)}>
        {hideLangSelector && <LangSelector />}
        <ThemeSelector />
        {!isMobile && link}
        <AuthButton />
      </nav>
    </Stack>
  );
});
