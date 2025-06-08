import { useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { IShipping } from '../types/shipping';
import { Card, Link, Typography } from '@mui/joy';
import { getRouteShipping } from 'shared/const/router';

interface ShippingCardProps {
  className?: string;
  shipping: IShipping;
  showMoreLink?: boolean;
}

export const ShippingCard: FC<ShippingCardProps> = (props) => {
  const { t } = useTranslation('shippings');

  const { className, shipping, showMoreLink } = props;

  const from = useMemo(
    () =>
      `${shipping.route.start_warehouse.name}, ${shipping.route.start_warehouse.address}, ${shipping.route.start_warehouse.city}`,
    [shipping]
  );

  const to = useMemo(
    () =>
      `${shipping.route.end_warehouse.name}, ${shipping.route.end_warehouse.address}, ${shipping.route.end_warehouse.city}`,
    [shipping]
  );

  return (
    <Card className={classNames('ShippingCard', { additional: [className] })}>
      <Typography>
        <Typography level="title-lg">{t('shippingCard.id')} </Typography>
        <Typography level="body-lg">{shipping.id}</Typography>
      </Typography>

      <Typography>
        <Typography level="title-lg">{t('shippingCard.status')} </Typography>
        <Typography level="body-lg">{t(`status.${shipping.status}`)}</Typography>
      </Typography>

      <Typography>
        <Typography level="title-lg">{t('shippingCard.date')} </Typography>
        <Typography level="body-lg">{new Date(shipping.date).toLocaleDateString('ru-RU')}</Typography>
      </Typography>

      <Typography>
        <Typography level="title-lg">{t('shippingCard.from')} </Typography>
        <Typography level="body-lg">{from}</Typography>
      </Typography>

      <Typography>
        <Typography level="title-lg">{t('shippingCard.to')} </Typography>
        <Typography level="body-lg">{to}</Typography>
      </Typography>

      {shipping.status === 'loading' && (
        <Typography>
          <Typography level="title-lg">{t('shippingCard.amount_cargos')} </Typography>
          <Typography level="body-lg">
            {shipping.unload_cargos}/{shipping.amount_cargos}
          </Typography>
        </Typography>
      )}

      {showMoreLink && <Link href={getRouteShipping(shipping.id)}>{t('shippingCard.moreLink')}</Link>}
    </Card>
  );
};
