import { Stack, Typography } from '@mui/joy';
import type { FC } from 'react';

interface CarPreviewProps {
  className?: string;
}

type IDeliveryType = {
  id: number;
  name: string;
  img: string;
};
import car1t from 'shared/assets/cars/1t.png';
import car2t from 'shared/assets/cars/2t.png';
import car3_5t from 'shared/assets/cars/3_5t.png';

const deliveryTypeList: IDeliveryType[] = [
  {
    id: 1,
    name: 'Перевозка грузов до 1 тонны',
    img: car1t,
  },
  {
    id: 2,
    name: 'Перевозка грузов до 2 тонн',
    img: car2t,
  },
  {
    id: 3,
    name: 'Перевозка грузов до 3,5 тонн',
    img: car3_5t,
  },
  {
    id: 4,
    name: 'Перевозка грузов до 1 тонны',
    img: car1t,
  },
  {
    id: 5,
    name: 'Перевозка грузов до 2 тонн',
    img: car2t,
  },
  {
    id: 6,
    name: 'Перевозка грузов до 3,5 тонн',
    img: car3_5t,
  },
];

export const CarPreview: FC<CarPreviewProps> = (props) => {
  const { className } = props;

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      className={className}
      justifyContent="space-around"
    >
      {deliveryTypeList.map((car) => (
        <Stack alignItems="center">
          <img
            src={car.img}
            width="180px"
          />
          <Typography level="title-lg">{car.name}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};
