import { useCallback, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Alert, Button, IconButton } from '@mui/joy';
import { IShipping } from 'entities/Shipping';
import { useFetch } from 'entities/User';
import { Close, ErrorOutlined } from '@mui/icons-material';

interface ShippingStartDeliveryButtonProps {
  className?: string;
  shipping: IShipping;
  onUpdated?: () => void;
}

export const ShippingStartDeliveryButton: FC<ShippingStartDeliveryButtonProps> = (props) => {
  const { t } = useTranslation('shippings');

  const { className, shipping, onUpdated } = props;

  const { request, isLoading, error, onClearError } = useFetch();

  const onStartDelivery = useCallback(() => {
    request(`/api/shippings/${shipping.id}/start_delivery`, {
      method: 'post',
    }).then((res) => {
      if (!res) return;
      onUpdated?.();
    });
  }, [request, shipping, onUpdated]);

  return (
    <>
      <Button
        className={classNames('ShippingStartDeliveryButton', { additional: [className] })}
        variant="outlined"
        color="neutral"
        onClick={onStartDelivery}
        loading={isLoading}
      >
        {t('ShippingStartDeliveryButton.btn')}
      </Button>
      {error && (
        <Alert
          variant="soft"
          color="danger"
          startDecorator={<ErrorOutlined />}
          endDecorator={
            <IconButton
              variant="soft"
              color="danger"
              onClick={onClearError}
            >
              <Close />
            </IconButton>
          }
        >
          {t(`ShippingStartDeliveryButton.${error ? error : 'undefined_error'}`)}
        </Alert>
      )}
    </>
  );
};
