import { useCallback, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, DialogTitle, Modal, ModalDialog, Stack } from '@mui/joy';
import { IUser, useFetch, UserSelector } from 'entities/User';

interface RouteAssigneUserProps {
  className?: string;
  routeId: string | number;
  onSavedCallback?: () => void;
}

export const RouteAssigneUser: FC<RouteAssigneUserProps> = (props) => {
  const { t } = useTranslation('warehouses');

  const { className, routeId, onSavedCallback } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const { request, isLoading } = useFetch();

  const [selectedUser, setSelectedUser] = useState<IUser | undefined | null>(undefined);

  const onSave = useCallback(() => {
    if (!selectedUser) return;
    request(`/api/routes/${routeId}`, {
      method: 'put',
      body: {
        user_id: selectedUser.id,
      },
    }).then((res) => {
      if (!res) return;
      setModalOpen(false);
      onSavedCallback?.();
    });
  }, [selectedUser, request, routeId, onSavedCallback]);

  return (
    <div className={classNames('a', { additional: [className] })}>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => setModalOpen(true)}
      >
        {t('RouteAssigneUser.button')}
      </Button>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <ModalDialog>
            <DialogTitle>{t('RouteAssigneUser.modal.title')}</DialogTitle>
            <Stack
              direction="column"
              gap="8px"
            >
              <UserSelector
                additionalFilter={{ roles: ['courier'] }}
                disabled={isLoading}
                onSelect={(v) => setSelectedUser(v)}
              />
              <Button
                disabled={isLoading || !selectedUser}
                onClick={onSave}
              >
                {t('RouteAssigneUser.modal.saveBtn')}
              </Button>
            </Stack>
          </ModalDialog>
        </Modal>
      )}
    </div>
  );
};
