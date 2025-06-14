import { type FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './OrderPage.module.scss';
import { useParams } from 'react-router';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { useAdmin, UserInfoCard } from 'entities/User';
import { Accordion, AccordionGroup, AccordionSummary, AccordionDetails, Stack, Typography, Box } from '@mui/joy';
import { CallReceived, CallMade, Person, Inventory2 } from '@mui/icons-material';
import { WarehouseInfoCard } from 'entities/Worehouse';
import { useTranslation } from 'react-i18next';
import { TypoWithLabel } from 'shared/ui/TypoWithLabel/TypoWithLabel';
import { useOrderInfo } from 'entities/Order';
import { BackLink } from 'shared/ui/BackLink';
import { OrderStatusSelector } from 'features/OrderStatusSelector';
import { OrderPriceEditor } from 'features/OrderPriceEditor';
import { OrderPaymentButton } from 'features/OrderPaymentButton';
import { CargoList } from 'widgets/CargoList';
import { OrderCargosApprove } from 'features/_order/OrderCargosApprove';
import { OrderDeleteButton } from 'features/OrderDeleteButton';
import { useMobile } from 'shared/lib/useMobile/useMobile';

interface OrderPageProps {
  className?: string;
}

export const OrderPage: FC<OrderPageProps> = (props) => {
  const { orderId } = useParams();
  const { className } = props;
  const { t } = useTranslation(['translatioins', 'orders']);

  const { order, setOrder, onReloadOrderInfo } = useOrderInfo(orderId);

  const isMobile = useMobile();
  const isAdmin = useAdmin();

  return (
    <AccountLayout className={classNames(cls.OrderPage, { additional: [className] })}>
      <BackLink />
      {order && (
        <Box>
          <Typography level="h1">{t('orders:OrdersPage.titles.order')}</Typography>
          <Box sx={{ p: '8px' }}>
            <TypoWithLabel label={t('orders:OrdersPage.titles.ID')}>{order.id}</TypoWithLabel>
            <OrderStatusSelector order={order} />
            <OrderPriceEditor
              hideEditor
              status={order.status}
              price={order.price}
            />

            {/*
            <TypoWithLabel label={t('orders:order.fields.delivery_date.title')}>
              {order.delivery_date || t('orders:order.fields.delivery_date.null')}
            </TypoWithLabel>
            */}

            {isAdmin && (
              <Stack
                direction="row"
                gap="8px"
              >
                {order.status === 'wait_payment' && (
                  <>
                    <OrderPaymentButton
                      order={order}
                      onUpdateOrder={setOrder}
                    />
                  </>
                )}
                {<OrderDeleteButton order={order} />}
              </Stack>
            )}
          </Box>

          <AccordionGroup>
            <Accordion defaultExpanded={!isMobile}>
              <AccordionSummary>
                <Typography
                  level="h2"
                  endDecorator={<Person />}
                >
                  {t('orders:OrdersPage.titles.users')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  direction="row"
                  gap="8px"
                  sx={{
                    marginBottom: '8px',
                    '@media (max-width: 768px)': {
                      flexDirection: 'column',
                    },
                  }}
                >
                  <UserInfoCard
                    title={
                      <Typography level="h3">
                        {t('orders:OrdersPage.titles.sender')}
                        <CallMade />
                      </Typography>
                    }
                    user={order.sender}
                    showMoreButton
                    className={classNames(cls.userCard)}
                  />
                  {order?.receiver && (
                    <UserInfoCard
                      title={
                        <Typography level="h3">
                          {t('orders:OrdersPage.titles.receiver')}
                          <CallReceived />
                        </Typography>
                      }
                      user={order.receiver}
                      showMoreButton
                      className={classNames(cls.userCard)}
                    />
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={!isMobile}>
              <AccordionSummary>
                <Typography
                  level="h2"
                  endDecorator={<Inventory2 />}
                >
                  {t('orders:OrdersPage.titles.warehouses')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  direction="row"
                  gap="8px"
                  sx={{
                    '@media (max-width: 768px)': {
                      flexDirection: 'column',
                    },
                  }}
                >
                  <WarehouseInfoCard
                    title={
                      <Typography level="h3">
                        {t('orders:OrdersPage.titles.start_warehouse')}
                        <CallMade />
                      </Typography>
                    }
                    warehouse={order.start_warehouse}
                    className={classNames(cls.warehouseCard)}
                    showMoreButton
                  />
                  <WarehouseInfoCard
                    title={
                      <Typography level="h3">
                        {t('orders:OrdersPage.titles.end_warehouse')}
                        <CallReceived />
                      </Typography>
                    }
                    warehouse={order.end_warehouse}
                    showMoreButton
                    className={classNames(cls.warehouseCard)}
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
          <CargoList
            orderId={order.id}
            orderStatus={order.status}
            summaryChildren={
              <OrderCargosApprove
                order={order}
                onUpdatedCallback={onReloadOrderInfo}
              />
            }
            onUpdated={onReloadOrderInfo}
          />
        </Box>
      )}
    </AccountLayout>
  );
};

export default OrderPage;
