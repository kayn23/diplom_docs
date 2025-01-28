import { memo, type FC } from 'react';
import { Modal } from 'shared/ui/Modal';
import { LoginForm } from './LoginForm';
import { useTranslation } from 'react-i18next';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = memo((props) => {
  const { t } = useTranslation();
  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} header={<h2 className="font-l">{t('features.LoginModal.header')}</h2>}>
      {isOpen && <LoginForm onSuccess={onClose} />}
    </Modal>
  );
});
