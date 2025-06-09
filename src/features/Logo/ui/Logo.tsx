import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import logo from 'shared/assets/logo.png';
import { useTranslation } from 'react-i18next';
import { Link, Stack, Typography } from '@mui/joy';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = (props) => {
  const { t } = useTranslation('mainpage');
  const { className } = props;

  return (
    <Link href="/">
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        sx={{ userSelect: 'none' }}
      >
        <Typography
          level="h2"
          sx={{ color: '#f15939', letterSpacing: '2px' }}
          fontStyle="italic"
        >
          {t('appName')}
        </Typography>
        <img
          className={classNames('Logo', { additional: [className] })}
          src={logo}
          width="60px"
        />
      </Stack>
    </Link>
  );
};
