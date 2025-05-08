import { ChangeEvent, useCallback, useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './OrderCargosApprove.module.scss';
import { Button, DialogTitle, FormControl, FormLabel, Input, Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Done } from '@mui/icons-material';
import { IOrder } from 'entities/Order';
import { NumericFormatAdapter } from 'shared/ui/NumericFormatAdapter';
import { ICargo } from 'entities/Cargo';
import { useAdmin, useFetch } from 'entities/User';

interface OrderCargosApproveProps {
  className?: string;
  order: IOrder;
}

export const OrderCargosApprove: FC<OrderCargosApproveProps> = (props) => {
  const { t } = useTranslation('orders');
  const { className, order } = props;

  const [openModal, setOpenModal] = useState(false);

  const [priceInput, setPriceInput] = useState(order.price || '');

  const onChangePrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPriceInput(e.target.value);
    },
    [setPriceInput]
  );

  const { request } = useFetch();
  const [cargos, setCargos] = useState<ICargo[]>([]);
  const getCargoList = useCallback(
    (orderId: string | number, page: number = 1) => {
      request<ICargo[]>(`/api/orders/${orderId}/cargos?page=${page}`).then((res) => {
        if (res) setCargos(res);
      });
    },
    [request]
  );

  const isAdmin = useAdmin();

  useEffect(() => {
    getCargoList(order.id);
  }, [getCargoList, order]);

  const onApprove = useCallback(() => {}, []);

  return (
    <div className={classNames(cls.OrderCargoAprove, { additional: [className] })}>
      {isAdmin && order.status === 'created' && cargos.length > 0 && (
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Done />}
          onClick={(e) => {
            e.stopPropagation();
            setOpenModal(true);
          }}
        >
          {t('orderCargosApprove.approveBtn')}
        </Button>
      )}

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalDialog>
          <ModalClose />
          <DialogTitle>{t('orderCargosApprove.modalTitle')}</DialogTitle>
          <FormControl>
            <FormLabel>{t('orderCargosApprove.priceInputLabel')}</FormLabel>
            <Input
              onChange={onChangePrice}
              autoFocus
              slotProps={{
                input: {
                  component: NumericFormatAdapter,
                },
              }}
              value={priceInput}
            />
          </FormControl>
          <Button
            startDecorator={<Done />}
            onClick={onApprove}
          >
            {t('orderCargosApprove.saveBtn')}
          </Button>
        </ModalDialog>
      </Modal>
    </div>
  );
};
