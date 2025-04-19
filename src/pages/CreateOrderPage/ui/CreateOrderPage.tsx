import { useCallback, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/joy';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { CreateOrderSidebar } from './CreateOrderSidebar';
import { IOrder } from 'entities/Order';
import { useFetch } from 'entities/User';
import { useNavigate } from 'react-router';
import { getRouteOrder } from 'shared/const/router';
import { OrderForm, useOrderFormParams } from 'features/OrderForm';

interface CreateOrderPageProps {}

export const CreateOrderPage: FC<CreateOrderPageProps> = () => {
  const { t } = useTranslation('orders');

  const { orderParams, onUpdateForm } = useOrderFormParams();

  const { request, isLoading } = useFetch();
  const navigation = useNavigate();
  const onSave = useCallback(async () => {
    console.log(orderParams);
    const res = await request<IOrder>('/api/orders', {
      method: 'post',
      body: {
        ...orderParams,
      },
    });
    if (res) navigation(getRouteOrder(res.id));
  }, [request, orderParams, navigation]);

  return (
    <AccountLayout sidebar={<CreateOrderSidebar />}>
      <Typography level="h1">{t('CreateOrderPage.title')}</Typography>
      <OrderForm
        formParams={orderParams}
        onUpdate={onUpdateForm}
      >
        <>
          <Button
            onClick={onSave}
            loading={isLoading}
          >
            {t('order.form.btn.save')}
          </Button>
        </>
      </OrderForm>
    </AccountLayout>
  );
};

export default CreateOrderPage;
