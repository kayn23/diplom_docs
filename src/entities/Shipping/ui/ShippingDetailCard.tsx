import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { IShippingDetails } from '../types/shipping';

interface ShippingDetailCardProps {
  className?: string;
  shipping: IShippingDetails;
}

export const ShippingDetailCard: FC<ShippingDetailCardProps> = (props) => {
  const { t } = useTranslation('shippings');

  const { className } = props;

  return <div className={classNames('ShippingDetailCard', { additional: [className] })}></div>;
};
