import { FormEvent, memo, useCallback, useState, type FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button/ui/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { loginUserAsync } from '../model/services/loginUserAsync/loginUserAsync';
import { getLoginError } from '../model/selectors/getLoginError';

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
    (value: string) => {
      setEmail(value);
    },
    [setEmail]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      setPassword(value);
    },
    [setPassword]
  );

  return (
    <form onSubmit={onSubmit} className={classNames(cls.LoginForm, { additional: [className] })}>
      <p>{error}</p>
      <Input
        value={email}
        onChange={onChangeEmail}
        placeholder={t('features.LoginModal.form.email')}
        theme="outline"
        autofocus
      />
      <Input
        value={password}
        onChange={onChangePassword}
        type="password"
        placeholder={t('features.LoginModal.form.password')}
        theme="outline"
      />
      <Button theme="clear" type="submit">
        {t('features.LoginModal.button')}
      </Button>
    </form>
  );
});
