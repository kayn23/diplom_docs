import { Stack, Typography } from '@mui/joy';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { ShippingCard, useGetShippings } from 'entities/Shipping';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

interface ShippingsPageProps {
  className?: string;
}

export const ShippingsPage: FC<ShippingsPageProps> = (props) => {
  const { t } = useTranslation('shippings');

  const { className } = props;

  const { shippings } = useGetShippings({ not_finished: true });

  return (
    <AccountLayout className={classNames('ShippingsPage', { additional: [className] })}>
      <Typography level="h1">{t('shippingsPage.title')}</Typography>
      {shippings.length === 0 && <Typography level="title-lg">{t('shippingsPage.not_found')}</Typography>}
      <Stack gap="8px">
        {shippings.map((s) => (
          <ShippingCard
            shipping={s}
            key={s.id}
            showMoreLink
          />
        ))}
      </Stack>
    </AccountLayout>
  );
};

export default ShippingsPage;
