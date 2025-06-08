import { useCallback, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { IShipping } from 'entities/Shipping';
import { useFetch } from 'entities/User';
import { Button } from '@mui/joy';

interface ShippingStartLoadButtonProps {
  className?: string;
  shipping: IShipping;
  onUpdated?: () => void;
}

export const ShipingStartLoadButton: FC<ShippingStartLoadButtonProps> = (props) => {
  const { t } = useTranslation('shippings');

  const { className, shipping, onUpdated } = props;

  const { request, isLoading } = useFetch();

  const onStartLoad = useCallback(() => {
    request(`/api/shippings/${shipping.id}/start_load`, {
      method: 'post',
    }).then((res) => {
      if (!res) return;
      onUpdated?.();
    });
  }, [request, onUpdated, shipping]);

  return (
    <Button
      className={classNames('ShippingStartLoad', { additional: [className] })}
      color="neutral"
      variant="outlined"
      onClick={onStartLoad}
      loading={isLoading}
    >
      {t('ShipingStartLoadButton.btn')}
    </Button>
  );
};
