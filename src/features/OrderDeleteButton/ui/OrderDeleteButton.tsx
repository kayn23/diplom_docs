import { memo, useCallback, useState, type FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, DialogActions, DialogTitle, Divider, Modal, ModalDialog, Typography } from '@mui/joy';
import { IOrder } from 'entities/Order';
import { Warning } from '@mui/icons-material';
import { useFetch } from 'entities/User';
import { useNavigate } from 'react-router';
import { getRouteOrders } from 'shared/const/router';

interface OrderDeleteButtonProps {
  className?: string;
  order: IOrder;
}

export const OrderDeleteButton: FC<OrderDeleteButtonProps> = memo((props) => {
  const { t } = useTranslation('orders');

  const { className, order } = props;

  const { request } = useFetch();
  const navigate = useNavigate();
  const onDeleteRequest = useCallback(() => {
    request(`/api/orders/${order.id}`, {
      method: 'delete',
    }).then(() => {
      navigate(getRouteOrders(), {
        replace: true,
      });
    });
  }, [request, order, navigate]);

  const [deleteModal, setDeleteModal] = useState(false);
  const onDeleteClick = useCallback(() => {
    setDeleteModal(true);
  }, []);

  return (
    <div className={classNames('OrderDeleteButton', { additional: [className] })}>
      {!['completed', 'canceled'].includes(order.status) && (
        <Button
          onClick={onDeleteClick}
          startDecorator={<Warning />}
          endDecorator={<Warning />}
          color="danger"
        >
          {t('deleteButton.btn')}
        </Button>
      )}
      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
      >
        <ModalDialog
          variant="outlined"
          role="alertdialog"
        >
          <DialogTitle>
            <Warning />
            {t('deleteButton.modal.title', { orderId: order.id })}
          </DialogTitle>
          <Divider />
          <Typography level="title-lg">
            <Trans
              i18nKey="orders:deleteButton.modal.disclaimer"
              components={{ br: <br /> }}
            />
          </Typography>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={onDeleteRequest}
            >
              {t('deleteButton.modal.applyBtn')}
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setDeleteModal(false)}
            >
              {t('deleteButton.modal.cancelBtn')}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
});
