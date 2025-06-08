import { memo, useCallback, type FC } from 'react';
import { LoginForm } from './LoginForm';
import { useTranslation } from 'react-i18next';
import { Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { authActions } from '../model/slice/authSlice';
import { useNavigate } from 'react-router';
import { IAuthRequest, useGeneralLink } from 'entities/User';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = memo((props) => {
  const { t } = useTranslation();
  const { isOpen, onClose } = props;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { getLink } = useGeneralLink();

  const onCloseEvent = () => {
    dispatch(authActions.clearState());
    onClose();
  };

  const onSuccess = useCallback(
    (value: IAuthRequest) => {
      navigate(getLink(value.user.roles));
    },
    [getLink, navigate]
  );

  return (
    <Modal
      open={isOpen}
      onClose={onCloseEvent}
    >
      <ModalDialog variant="plain">
        <ModalClose />
        <Typography>{t('features.LoginModal.header')}</Typography>
        <LoginForm onSuccess={onSuccess} />
      </ModalDialog>
    </Modal>
  );
});
