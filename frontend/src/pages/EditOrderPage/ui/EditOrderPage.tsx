import { useEffect, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { EditOrderSidebar } from './EditOrderSidebar';
import { Typography } from '@mui/joy';
import { OrderForm, useOrderFormParams } from 'features/OrderForm';
import { useParams } from 'react-router';
import { ICreateOrderParams, useOrderInfo } from 'entities/Order';

interface EditOrderPageProps {}

export const EditOrderPage: FC<EditOrderPageProps> = () => {
  const { t } = useTranslation('orders');

  const { orderId } = useParams();
  const { order } = useOrderInfo(orderId);
  const { orderParams, onUpdateForm } = useOrderFormParams();

  useEffect(() => {
    if (order) {
      onUpdateForm(order as ICreateOrderParams);
    }
  }, [order, onUpdateForm]);

  return (
    <AccountLayout sidebar={<EditOrderSidebar />}>
      <Typography level="h1">{t('EditOrderPage.title', { orderId })}</Typography>
      <OrderForm
        formParams={orderParams}
        onUpdate={onUpdateForm}
      ></OrderForm>
    </AccountLayout>
  );
};

export default EditOrderPage;
