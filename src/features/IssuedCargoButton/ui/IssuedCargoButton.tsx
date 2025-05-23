import { Button, DialogActions, DialogTitle, Modal, ModalClose, ModalDialog, Stack } from '@mui/joy';
import { useFetch } from 'entities/User';
import { memo, useCallback, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { QrCodeScannerModal } from 'shared/ui/QrCodeScannerModal/QrCodeScannerModal';
import { CargoScanInformation } from 'shared/ui/QrCodeScannerModal/types';

interface IssuedCargoButtonProps {
  className?: string;
  orderId: string | number;
  onUpdated?: () => void;
}

export const IssuedCargoButton: FC<IssuedCargoButtonProps> = memo((props) => {
  const { t } = useTranslation('cargos');

  const { className, orderId, onUpdated } = props;

  const { request, isLoading } = useFetch();
  const [cargoId, setCargoId] = useState<number | string>();
  const [openModal, setOpenModal] = useState(false);

  const handOverOrder = useCallback(
    (order_id: number | string, cargo_id: number | string | undefined) => {
      if (!cargo_id) return;
      request(`/api/orders/${order_id}/cargos/${cargo_id}/hand_over`, { method: 'post' }).then((res) => {
        if (!res) return;
        setCargoId(undefined);
        setOpenModal(false);
        onUpdated?.();
      });
    },
    [request, onUpdated]
  );

  const onScanned = useCallback((value: string) => {
    const result = JSON.parse(value) as CargoScanInformation;
    if (result.type !== 'cargo') return;
    setCargoId(result.id);
    setOpenModal(true);
  }, []);

  return (
    <Stack
      direction="row"
      gap="8px"
      className={classNames('OrderFinishButton', { additional: [className] })}
    >
      <QrCodeScannerModal
        childrenBtn={
          <Button
            loading={isLoading}
            variant="outlined"
            color="neutral"
          >
            {t('IssuedCargoButton.issuedBtn')}
          </Button>
        }
        onScanned={onScanned}
      />
      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <ModalDialog>
            <DialogTitle>{t('IssuedCargoButton.modal.title', { id: cargoId })}</DialogTitle>
            <ModalClose />
            <DialogActions>
              <Button
                onClick={() => handOverOrder(orderId, cargoId)}
                variant="outlined"
                color="neutral"
              >
                {t('IssuedCargoButton.modal.okBtn')}
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      )}
    </Stack>
  );
});
