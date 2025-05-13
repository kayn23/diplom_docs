import { memo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { CarCard, useGetCars } from 'entities/Vehicle';
import { Stack, Typography } from '@mui/joy';
import { AddCarModal } from './AddCarModal';
import { EditCarModal } from './EditCarModal';

interface CarListWidgetProps {
  className?: string;
  userId: number;
}

export const CarListWidget: FC<CarListWidgetProps> = memo((props) => {
  const { t } = useTranslation('cars');

  const { className, userId } = props;

  const { cars, onReload } = useGetCars(userId);

  return (
    <Stack
      gap="8px"
      className={classNames('AddCarsWidget', { additional: [className] })}
    >
      {cars.length === 0 && <Typography>{t('carsWidget.no_found_cars')}</Typography>}
      <AddCarModal
        onCreated={onReload}
        userId={userId}
      />
      {cars.map((car) => (
        <div key={car.id}>
          <CarCard car={car}>
            <EditCarModal
              car={car}
              onUpdated={onReload}
            />
          </CarCard>
        </div>
      ))}
    </Stack>
  );
});
