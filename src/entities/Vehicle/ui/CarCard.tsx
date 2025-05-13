import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card, Typography } from '@mui/joy';
import { IVehicle } from '../types/vehicle';

interface CarCardProps {
  className?: string;
  car: IVehicle;
  children?: ReactNode;
}

export const CarCard: FC<CarCardProps> = (props) => {
  const { t } = useTranslation('cars');

  const { className, car, children } = props;

  return (
    <Card className={classNames('CarCard', { additional: [className] })}>
      <Typography>
        <Typography level="title-lg">{t('card.name')} </Typography>
        <Typography level="body-lg">{car.name}</Typography>
      </Typography>
      <Typography>
        <Typography level="title-lg">{t('card.size')} </Typography>
        <Typography level="body-lg">
          {car.capacity} {t('card.size_value')}
        </Typography>
      </Typography>
      <Typography>
        <Typography level="title-lg">{t('card.capacity')} </Typography>
        <Typography level="body-lg">
          {car.load_capacity} {t('card.capacity_value')}
        </Typography>
      </Typography>
      {car.active && (
        <Typography>
          <Typography level="title-lg">{t('card.active')}</Typography>
        </Typography>
      )}
      {children}
    </Card>
  );
};
