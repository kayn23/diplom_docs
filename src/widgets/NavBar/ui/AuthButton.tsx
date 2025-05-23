import { memo, useCallback, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/ui/Button';
import { LoginModal } from 'features/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth, getUserEmail, userActions } from 'entities/User';
import { Typography } from '@mui/joy';

interface AuthButtonProps {
  className?: string;
}

export const AuthButton: FC<AuthButtonProps> = memo((props) => {
  const { t } = useTranslation();

  const { className } = props;

  const [isOpen, setIsOpen] = useState(false);

  const onCloseLoginModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onOpenLoginModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const dispatch = useDispatch();

  const onClickExitButton = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAuth = useSelector(getIsAuth);

  const userEmail = useSelector(getUserEmail);

  return (
    <>
      {!isAuth && (
        <>
          <Button
            className={classNames('AuthButton', { additional: [className] })}
            onClick={onOpenLoginModal}
            theme="clear"
          >
            {t('features.AuthButton.button')}
          </Button>
          <LoginModal
            isOpen={isOpen}
            onClose={onCloseLoginModal}
          />
        </>
      )}

      {isAuth && (
        <>
          <Typography>{userEmail}</Typography>
          <Button
            className={classNames('AuthButton', { additional: [className] })}
            theme="clear"
            onClick={onClickExitButton}
          >
            {t('features.AuthButton.exit-button')}
          </Button>
        </>
      )}
    </>
  );
});
