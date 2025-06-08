import { memo, useCallback, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, DialogTitle, Modal, ModalDialog } from '@mui/joy';
import { CarForm } from 'features/CarForm';
import { IVehicle } from 'entities/Vehicle';
import { useFetch } from 'entities/User';

interface AddCarModalProps {
  className?: string;
  onCreated?: () => void;
  userId: number;
}

export const AddCarModal: FC<AddCarModalProps> = memo((props) => {
  const { t } = useTranslation('cars');

  const { className, onCreated, userId } = props;

  const [openModal, setOpenModal] = useState(false);

  const [car, setCar] = useState<Partial<IVehicle>>({});

  const { request, isLoading } = useFetch();

  const onCreate = useCallback(() => {
    request(`/api/users/${userId}/cars`, {
      method: 'post',
      body: {
        ...car,
      },
    }).then((res) => {
      if (!res) return;
      onCreated?.();
      setOpenModal(false);
    });
  }, [request, car, userId, onCreated]);

  return (
    <div className={classNames('AddCarModal', { additional: [className] })}>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => setOpenModal(true)}
      >
        {t('carsWidget.addCarBtn')}
      </Button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalDialog>
          <DialogTitle>{t('carsWidget.modal.title')}</DialogTitle>
          <CarForm
            car={car}
            onUpdate={setCar}
            variant="plain"
            disabled={isLoading}
          >
            <Button
              onClick={onCreate}
              loading={isLoading}
            >
              {t('carsWidget.modal.saveBtn')}
            </Button>
          </CarForm>
        </ModalDialog>
      </Modal>
    </div>
  );
});
