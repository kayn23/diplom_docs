import { ChangeEvent, FormEvent, memo, useCallback, useState, type FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { loginUserAsync } from '../model/services/loginUserAsync/loginUserAsync';
import { getLoginError } from '../model/selectors/getLoginError';
import { Button, Input, Typography } from '@mui/joy';

interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

export const LoginForm: FC<LoginFormProps> = memo((props) => {
  const { t } = useTranslation();

  const { className, onSuccess } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const error = useSelector(getLoginError);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await dispatch(loginUserAsync({ email, password }));
      if (loginUserAsync.fulfilled.match(res)) onSuccess?.();
    },
    [dispatch, email, password, onSuccess]
  );

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  return (
    <form onSubmit={onSubmit} className={classNames(cls.LoginForm, { additional: [className] })}>
      {error && <Typography color="danger">{error}</Typography>}
      <Input value={email} onChange={onChangeEmail} placeholder={t('features.LoginModal.form.email')} variant="soft" />
      <Input
        value={password}
        onChange={onChangePassword}
        type="password"
        placeholder={t('features.LoginModal.form.password')}
        variant="soft"
      />
      <Button type="submit" variant="plain">
        {t('features.LoginModal.button')}
      </Button>
    </form>
  );
});
