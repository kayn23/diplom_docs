import { QrCodeScanner } from '@mui/icons-material';
import { Button, DialogActions, DialogTitle, Modal, ModalClose, ModalDialog } from '@mui/joy';
import { IShipping } from 'entities/Shipping';
import { useFetch } from 'entities/User';
import { useCallback, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { QrCodeScannerModal } from 'shared/ui/QrCodeScannerModal/QrCodeScannerModal';

interface LoadCargoProps {
  className?: string;
  shipping: IShipping;
  onUpdated?: () => void;
}

interface ScanInformation {
  type: string;
  id: number | string;
  order_id: number | string;
}

export const LoadCargo: FC<LoadCargoProps> = (props) => {
  const { t } = useTranslation('shippings');

  const { className, shipping, onUpdated } = props;

  const { request, isLoading } = useFetch();
  const [openModal, setOpenModal] = useState(false);

  const onClose = useCallback(() => {
    setOpenModal(false);
    onUpdated?.();
  }, [onUpdated]);

  const load = useCallback(
    (id: number | string, shipping_id: number | string) => {
      request(`/api/shippings/${shipping_id}/cargo_in_shippings/${id}/load`, {
        method: 'post',
      }).then((res) => {
        if (!res) return;
        setOpenModal(true);
      });
    },
    [request]
  );

  const onScanned = useCallback(
    (value: string) => {
      const result = JSON.parse(value) as ScanInformation;
      if (result.type === 'cargo') {
        load(result.id, shipping.id);
      }
    },
    [load, shipping]
  );

  return (
    <div className={classNames('LoadCargo', { additional: [className] })}>
      <QrCodeScannerModal
        childrenBtn={
          <Button
            startDecorator={<QrCodeScanner />}
            loading={isLoading}
          >
            {t('approveCargoBtn.approveBtn')}
          </Button>
        }
        onScanned={onScanned}
      />
      <Modal
        open={openModal}
        onClose={onClose}
      >
        <ModalDialog>
          <DialogTitle>{t('approveCargoBtn.confirmTitle')}</DialogTitle>
          <ModalClose />
          <DialogActions>
            <Button
              onClick={onClose}
              variant="outlined"
              color="neutral"
            >
              {t('approveCargoBtn.okBtn')}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
};
