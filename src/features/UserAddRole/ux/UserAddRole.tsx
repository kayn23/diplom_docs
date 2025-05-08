import { SyntheticEvent, useCallback, useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UserAddRole.module.scss';
import { Autocomplete, Button, DialogTitle, Modal, ModalDialog } from '@mui/joy';
import { Done } from '@mui/icons-material';
import { IUser, Roles, roles, useFetch } from 'entities/User';

interface UserAddRoleProps {
  className?: string;
  user: IUser;
  onSaved?: () => void;
}

export const UserAddRole: FC<UserAddRoleProps> = (props) => {
  const { t } = useTranslation('users');

  const { className, user, onSaved } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState<Roles[]>([]);
  const onChange = useCallback((_e: SyntheticEvent, value: string[]) => {
    if (value) {
      setSelectedRole([...(value as Roles[])]);
    }
  }, []);

  useEffect(() => {
    setSelectedRole(user.roles);
  }, [setSelectedRole, user]);

  const { request, isLoading } = useFetch();
  const onSave = useCallback(() => {
    request(`/api/users/${user.id}/update_roles`, {
      method: 'post',
      body: {
        roles: selectedRole,
      },
    }).then(() => {
      setModalOpen(false);
      onSaved?.();
    });
  }, [setModalOpen, selectedRole, request, user, onSaved]);

  return (
    <div className={classNames(cls.UserAddRole, { additional: [className] })}>
      <Button onClick={() => setModalOpen(true)}>{t('UserAddRole.button')}</Button>

      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <ModalDialog>
            <DialogTitle>{t('UserAddRole.modal.title')}</DialogTitle>
            <Autocomplete
              multiple
              value={selectedRole}
              options={roles}
              getOptionLabel={(option) => t(`roles.${option}`)}
              onChange={onChange}
              disabled={isLoading}
            />
            <Button
              startDecorator={<Done />}
              onClick={onSave}
              loading={isLoading}
            >
              {t('UserAddRole.modal.saveBtn')}
            </Button>
          </ModalDialog>
        </Modal>
      )}
    </div>
  );
};
