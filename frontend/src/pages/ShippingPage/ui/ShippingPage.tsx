import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { useParams } from 'react-router';
import { ShippingCard, useShippingRequest } from 'entities/Shipping';
import { Stack, Typography } from '@mui/joy';
import { BackLink } from 'shared/ui/BackLink';
import { UserInfoCard } from 'entities/User';
import { ShipingStartLoadButton } from 'features/ShippingStartLoadButton';
import { ShippingStartDeliveryButton } from 'features/ShippingStartDeliveryButton';
import { LoadCargo } from 'features/LoadCargo';

interface ShippingPageProps {
  className?: string;
}

export const ShippingPage: FC<ShippingPageProps> = (props) => {
  const { t } = useTranslation('shippings');

  const { className } = props;
  const { shippingId } = useParams();

  const { shipping, onReload } = useShippingRequest(shippingId!);

  return (
    <AccountLayout className={classNames('ShippingPage', { additional: [className] })}>
      <BackLink />
      <Typography level="h1">{t('shippingPage.title', { id: shippingId })}</Typography>
      {shipping && (
        <Stack gap="8px">
          <ShippingCard shipping={shipping} />
          <Stack gap="8px">
            <Typography level="title-lg">{t('shippingPage.assignee')}</Typography>
            <UserInfoCard
              user={shipping.assignee}
              showMoreButton
            />
            {shipping?.status === 'created' && (
              <ShipingStartLoadButton
                shipping={shipping}
                onUpdated={onReload}
              />
            )}
            {shipping?.status === 'loading' && (
              <>
                <LoadCargo
                  shipping={shipping}
                  onUpdated={onReload}
                />
                <ShippingStartDeliveryButton
                  shipping={shipping}
                  onUpdated={onReload}
                />
              </>
            )}
          </Stack>
        </Stack>
      )}
    </AccountLayout>
  );
};

export default ShippingPage;
