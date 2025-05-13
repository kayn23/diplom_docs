import { useCallback, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, DialogTitle, Modal, ModalDialog } from '@mui/joy';
import { IVehicle } from 'entities/Vehicle';
import { CarForm } from 'features/CarForm';
import { useFetch } from 'entities/User';

interface EditCarModalProps {
  className?: string;
  car: IVehicle;
  onUpdated?: () => void;
}

export const EditCarModal: FC<EditCarModalProps> = (props) => {
  const { t } = useTranslation('cars');

  const { className, car, onUpdated } = props;

  const [openModal, setOpenModal] = useState(false);

  const [carLocal, setCar] = useState<Partial<IVehicle>>({});
  const onOpen = useCallback(() => {
    setCar(car);
    setOpenModal(true);
  }, [car]);

  const { request, isLoading } = useFetch();
  const onCreate = useCallback(() => {
    request(`/api/users/${car.user_id}/cars/${car.id}`, {
      method: 'put',
      body: {
        ...carLocal,
      },
    }).then((res) => {
      if (!res) return;
      onUpdated?.();
      setOpenModal(false);
    });
  }, [request, car, carLocal, onUpdated]);

  return (
    <div className={classNames('EditCarModal', { additional: [className] })}>
      <Button
        color="neutral"
        variant="outlined"
        onClick={onOpen}
      >
        {t('carsWidget.editModal.btn')}
      </Button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalDialog>
          <DialogTitle>{t('carsWidget.modal.title')}</DialogTitle>
          <CarForm
            car={carLocal}
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
};
