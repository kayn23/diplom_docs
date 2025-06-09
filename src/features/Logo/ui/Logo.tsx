import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import logo from 'shared/assets/logo.png';
import { useTranslation } from 'react-i18next';
import { Link, Stack, Typography } from '@mui/joy';

interface LogoProps {
  className?: string;
  level?: 'h1';
  textSize?: string | number;
  imgSize?: string | number;
  imgStart?: boolean;
}

export const Logo: FC<LogoProps> = (props) => {
  const { t } = useTranslation('mainpage');
  const { className, level = 'h2', imgSize = '60px', textSize, imgStart } = props;

  return (
    <Link href="/">
      <Stack
        direction="row"
        alignItems="center"
        gap="8px"
        sx={{ userSelect: 'none' }}
      >
        {imgStart && (
          <img
            className={classNames('Logo', { additional: [className] })}
            src={logo}
            width={imgSize}
          />
        )}
        <Typography
          level={level}
          sx={{ color: '#F28F70', letterSpacing: '2px', fontSize: textSize }}
          fontStyle="italic"
        >
          {t('appName')}
        </Typography>
        {!imgStart && (
          <img
            className={classNames('Logo', { additional: [className] })}
            src={logo}
            width={imgSize}
          />
        )}
      </Stack>
    </Link>
  );
};
