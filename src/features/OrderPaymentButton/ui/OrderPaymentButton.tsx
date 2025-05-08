import { useCallback, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/joy';
import { IOrder } from 'entities/Order';
import { useFetch } from 'entities/User';

interface OrderPaymentButtonProps {
  order: IOrder;
  onUpdateOrder?: (order: IOrder) => void;
}

export const OrderPaymentButton: FC<OrderPaymentButtonProps> = (props) => {
  const { t } = useTranslation();

  const { order, onUpdateOrder } = props;

  const { request, isLoading } = useFetch();

  const onAcceptPayment = useCallback(() => {
    request<IOrder>(`/api/orders/${order.id}/payment`, { method: 'post' }).then((res) => {
      if (res) onUpdateOrder?.(res);
    });
  }, [request, order, onUpdateOrder]);

  return (
    <Button
      onClick={onAcceptPayment}
      loading={isLoading}
    >
      {t('orders:paymentButton')}
    </Button>
  );
};
