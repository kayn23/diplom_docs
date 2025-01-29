import { memo, type FC } from 'react';
import { LoginForm } from './LoginForm';
import { useTranslation } from 'react-i18next';
import { Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { authActions } from '../model/slice/authSlice';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = memo((props) => {
  const { t } = useTranslation();
  const { isOpen, onClose } = props;
  const dispatch = useAppDispatch();

  const onCloseEvent = () => {
    dispatch(authActions.clearState());
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onCloseEvent}>
      <ModalDialog variant="plain">
        <ModalClose />
        <Typography>{t('features.LoginModal.header')}</Typography>
        <LoginForm />
      </ModalDialog>
    </Modal>
  );
});
