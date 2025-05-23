import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './OrderStatusSelector.module.scss';
import { IOrder } from 'entities/Order';
import { Typography } from '@mui/joy';
// import { useAdmin } from 'entities/User';

interface OrderStatusSelectorProps {
  className?: string;
  order: IOrder;
}

export const OrderStatusSelector: FC<OrderStatusSelectorProps> = (props) => {
  const { t } = useTranslation('orders');

  const { className, order } = props;

  // const options = useMemo(
  //   () =>
  //     statuses.map((status) => (
  //       <Option
  //         value={status}
  //         key={status}
  //       >
  //         {t(`OrdersPage.statuses.${status}`)}
  //       </Option>
  //     )),
  //   [t]
  // );

  // const isAdmin = useAdmin();

  const [isEdit /* , setIsEdit */] = useState(false);

  return (
    <div className={classNames(cls.OrderStatusSelector, { additional: [className] })}>
      <div className={cls.statusEditor}>
        <Typography>{t('orders:OrdersPage.titles.status')}</Typography>
        {!isEdit && (
          <>
            <Typography level="title-md">{t(`OrdersPage.statuses.${order.status}`)}</Typography>
            {/*<IconButton onClick={() => setIsEdit(true)}>
                <Edit />
              </IconButton>*/}
          </>
        )}
        {/*isEdit && (
            <>
              <Select
                defaultValue={order.status}
                sx={{ maxWidth: '300px', flexGrow: 1 }}
              >
                {options}
              </Select>
              <ButtonGroup>
                <IconButton
                  color="primary"
                  variant="solid"
                  onClick={() => setIsEdit(false)}
                >
                  <Done />
                </IconButton>
                <IconButton
                  color="danger"
                  variant="solid"
                  onClick={() => setIsEdit(false)}
                >
                  <Close />
                </IconButton>
              </ButtonGroup>
            </>
          )*/}
      </div>
    </div>
  );
};
