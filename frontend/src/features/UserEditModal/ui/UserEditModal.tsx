import { useCallback, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, DialogTitle, Modal, ModalDialog } from '@mui/joy';
import { Edit } from '@mui/icons-material';
import { IUser, useFetch, UserForm } from 'entities/User';

interface UserEditModalProps {
  className?: string;
  user: IUser;
  onUpdated?: () => void;
}

export const UserEditModal: FC<UserEditModalProps> = (props) => {
  const { t } = useTranslation('users');

  const { className, user, onUpdated } = props;

  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const [userParams, setUserParams] = useState<Partial<IUser>>(user);

  const { request, isLoading } = useFetch();

  const onSave = useCallback(() => {
    request(`/api/users/${user.id}`, {
      method: 'put',
      body: {
        ...userParams,
      },
    }).then((res) => {
      if (!res) return;
      onUpdated?.();
      setOpenModal(false);
    });
  }, [request, user, userParams, onUpdated]);

  return (
    <div className={classNames('UserEditModal', { additional: [className] })}>
      <Button
        onClick={() => setOpenModal(true)}
        variant="outlined"
        startDecorator={<Edit />}
        color="neutral"
      >
        {t('UserEditModal.openBtn')}
      </Button>
      {openModal && (
        <Modal
          open={openModal}
          onClose={onCloseModal}
        >
          <ModalDialog>
            <DialogTitle>{t('UserEditModal.title')}</DialogTitle>
            <UserForm
              userParams={userParams}
              onUpdate={setUserParams}
              hidePassword
            >
              <Button
                onClick={onSave}
                disabled={isLoading}
              >
                {t('UserEditModal.saveBtn')}
              </Button>
            </UserForm>
          </ModalDialog>
        </Modal>
      )}
    </div>
  );
};
