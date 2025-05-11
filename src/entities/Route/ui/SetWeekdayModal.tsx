import { useCallback, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, DialogTitle, Modal, ModalDialog, Stack } from '@mui/joy';
import { IRoute } from '../types/route';
import { WeekdaySelector } from 'shared/ui/WeekdaySelector';
import { useFetch } from 'entities/User';

interface SetWeekdayModalProps {
  className?: string;
  route: IRoute;
  onUpdated?: () => void;
}

export const SetWeekdayModal: FC<SetWeekdayModalProps> = (props) => {
  const { t } = useTranslation();

  const { className, route, onUpdated } = props;
  const [openModal, setOpenModal] = useState(false);
  const [days, setDays] = useState<number[]>(route.delivery_days || []);

  const { request, isLoading } = useFetch();
  const onSave = useCallback(() => {
    request(`/api/routes/${route.id}`, {
      method: 'put',
      body: {
        delivery_days: days,
      },
    }).then((res) => {
      if (!res) return;
      onUpdated?.();
      setOpenModal(false);
    });
  }, [request, days, onUpdated, route]);

  return (
    <div className={classNames('SetWeekdayModal', { additional: [className] })}>
      <Button
        variant="plain"
        onClick={() => setOpenModal(true)}
      >
        {t('routeInfoCard.deliveryDay.assigneeDeliveryDay')}
      </Button>
      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <ModalDialog>
            <DialogTitle>{t('routeInfoCard.SetWeekdayModal.title')}</DialogTitle>
            <Stack gap="8px">
              <WeekdaySelector
                selectedDays={days}
                onChange={setDays}
              />
              <Button
                loading={isLoading}
                onClick={onSave}
              >
                {t('buttons.saveBtn')}
              </Button>
            </Stack>
          </ModalDialog>
        </Modal>
      )}
    </div>
  );
};
