import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DialogTitle, Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Add } from '@mui/icons-material';
import { CargoForm } from 'entities/Cargo';
import { ICargo } from 'entities/Cargo/types/type';
import { useFetch } from 'entities/User';

interface CargoAttachModalProps {
  orderId: string | number;
  onCreated?: () => void;
}

export const CargoAttachModal: FC<CargoAttachModalProps> = (props) => {
  const { t } = useTranslation('cargos');
  const { orderId, onCreated } = props;

  const [open, setOpen] = useState(false);
  const [cargo, setCargo] = useState<Partial<ICargo>>({});
  const onUpdateForm = useCallback(
    (form: Partial<ICargo>) => {
      setCargo((prev) => ({
        ...prev,
        ...form,
      }));
    },
    [setCargo]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open, inputRef]);

  const { request, isLoading } = useFetch();
  const onSave = useCallback(() => {
    request(`/api/orders/${orderId}/cargos`, {
      method: 'post',
      body: {
        ...cargo,
      },
    }).then(() => {
      onCreated?.();
      setOpen(false);
      setCargo({});
    });
  }, [request, onCreated, orderId, cargo]);

  return (
    <>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        {t('attachCargoModal.addButton')}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalDialog>
          <ModalClose />
          <DialogTitle>{t('attachCargoModal.title')}</DialogTitle>
          {open && (
            <CargoForm
              cargo={cargo}
              inputRef={inputRef}
              onUpdate={onUpdateForm}
            />
          )}
          <Button
            startDecorator={<Add />}
            onClick={onSave}
            loading={isLoading}
          >
            {t('attachCargoModal.saveButton')}
          </Button>
        </ModalDialog>
      </Modal>
    </>
  );
};
