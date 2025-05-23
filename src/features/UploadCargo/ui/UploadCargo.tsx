import { useCallback, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useFetch } from 'entities/User';
import { QrCodeScannerModal } from 'shared/ui/QrCodeScannerModal/QrCodeScannerModal';
import { Button, DialogActions, DialogTitle, Modal, ModalClose, ModalDialog } from '@mui/joy';
import { QrCodeScanner } from '@mui/icons-material';
import { IWarehouse } from 'entities/Worehouse';

interface UploadCargoProps {
  className?: string;
  warehouse: IWarehouse;
  onUpdated?: () => void;
}

interface ScanInformation {
  type: string;
  id: number | string;
  order_id: number | string;
}

export const UploadCargo: FC<UploadCargoProps> = (props) => {
  const { t } = useTranslation('shippings');

  const { className, onUpdated, warehouse } = props;

  const { request, isLoading } = useFetch();
  const [openModal, setOpenModal] = useState(false);

  const onClose = useCallback(() => {
    setOpenModal(false);
    onUpdated?.();
  }, [onUpdated]);

  const upload = useCallback(
    (id: string | number) => {
      request(`/api/warehouses/${warehouse.id}/upload_cargo/${id}`, {
        method: 'post',
      }).then((res) => {
        if (!res) return;
        setOpenModal(true);
      });
    },
    [request, warehouse]
  );

  const onScanned = useCallback(
    (value: string) => {
      const result = JSON.parse(value) as ScanInformation;
      if (result.type === 'cargo') {
        upload(result.id);
      }
    },
    [upload]
  );

  return (
    <div className={classNames('UploadCargo', { additional: [className] })}>
      <QrCodeScannerModal
        childrenBtn={
          <Button
            startDecorator={<QrCodeScanner />}
            loading={isLoading}
          >
            {t('uploadCargo.btn')}
          </Button>
        }
        onScanned={onScanned}
      />
      <Modal
        open={openModal}
        onClose={onClose}
      >
        <ModalDialog>
          <DialogTitle>{t('uploadCargo.confirmTitle')}</DialogTitle>
          <ModalClose />
          <DialogActions>
            <Button
              onClick={onClose}
              variant="outlined"
              color="neutral"
            >
              {t('uploadCargo.okBtn')}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
};
