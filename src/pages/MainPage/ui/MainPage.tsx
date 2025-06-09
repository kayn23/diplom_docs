import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './MainPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Logo } from 'features/Logo';
import { Stack, Typography } from '@mui/joy';
import { CarPreview } from './CarPreview';
import mapImg from 'shared/assets/landing_img/map.png';
import imgFrindly1 from 'shared/assets/landing_img/1.webp';
import imgFrindly2 from 'shared/assets/landing_img/2.webp';
import imgFrindly3 from 'shared/assets/landing_img/3.webp';
import { useMobile } from 'shared/lib/useMobile/useMobile';

const MainPage: FC = () => {
  const { t } = useTranslation('mainpage');

  const isMobile = useMobile();

  return (
    <Stack className={classNames(cls.MainPage)}>
      <Stack
        className={cls.firstBlock}
        alignItems="center"
        justifyItems="center"
        sx={{ padding: { sm: '50px', xs: '20px' } }}
      >
        <Logo
          level="h1"
          textSize={isMobile ? '40px' : '70px'}
          imgSize={isMobile ? '70px' : '100px'}
          imgStart
        />{' '}
        <Typography
          level="h3"
          sx={{ color: '#F28F70', maxWidth: '500px', textAlign: 'right' }}
        >
          {t('firstBlock.label')}
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        className={cls.carPreviewBlock}
      >
        <Typography
          level="h1"
          textAlign="center"
          // sx={{ color: '#F28F70' }}
        >
          {t('carPreviewBlock.label')}
        </Typography>
        <CarPreview className={cls.carPreview} />
      </Stack>
      <Stack
        className={cls.mapBlock}
        alignItems="center"
        gap="8px"
      >
        <Typography
          level="h1"
          textAlign="center"
        >
          {t('mapBlock.label')}
        </Typography>
        <img src={mapImg} />
      </Stack>
      <Stack
        className={cls.friendlyBlock}
        alignItems="center"
        gap="8px"
      >
        <Typography
          level="h1"
          textAlign="center"
        >
          {t('friendlyBlock.label')}
        </Typography>
        <Stack
          gap="20px"
          direction={{ sm: 'row' }}
        >
          <img
            src={imgFrindly1}
            className={cls.friendlyImg}
          />
          <img
            src={imgFrindly2}
            className={cls.friendlyImg}
          />
          <img
            src={imgFrindly3}
            className={cls.friendlyImg}
          />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        sx={{ padding: { xs: '20px', sm: '50px' } }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Logo />
        <Typography sx={{ alignSelf: 'center' }}>{t('footer.feat')}</Typography>
      </Stack>
    </Stack>
  );
};

export default MainPage;
