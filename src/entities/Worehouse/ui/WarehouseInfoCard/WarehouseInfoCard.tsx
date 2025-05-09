import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WarehouseInfoCard.module.scss';
import { Card, Typography } from '@mui/joy';
import { IWarehouse } from '../../model/types/warehouse';
import { getRouteWarehouseInfo } from 'shared/const/router';
import { Link } from 'shared/ui/Link/Link';

interface WarehouseInfoCardProps {
  className?: string;
  warehouse: IWarehouse;
  showMoreButton?: boolean;
  title?: ReactNode;
}

export const WarehouseInfoCard: FC<WarehouseInfoCardProps> = (props) => {
  const { className, warehouse, showMoreButton = false, title } = props;
  const { t } = useTranslation();

  const { name, address, city } = warehouse;

  return (
    <Card className={classNames(cls.WarehouseInfoCard, { additional: [className] })}>
      {title}
      <Typography>
        <Typography>{t('warehouses.previewCard.name.title')}: </Typography>
        <Typography level="title-md">{name}</Typography>
      </Typography>
      <Typography>
        <Typography>{t('warehouses.previewCard.address.title')}: </Typography>
        <Typography level="title-md">{address}</Typography>
      </Typography>
      <Typography>
        <Typography>{t('warehouses.previewCard.city.title')}: </Typography>
        <Typography level="title-md">{city}</Typography>
      </Typography>
      {showMoreButton && <Link to={getRouteWarehouseInfo(warehouse.id)}>{t('buttons.showMore')}</Link>}
    </Card>
  );
};
