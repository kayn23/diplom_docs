import { memo, useCallback, useEffect, useRef, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { Button, Typography } from '@mui/joy';
import { IUser, useFetch, UserForm } from 'entities/User';
import { useNavigate } from 'react-router';
import { getRouteShowUser } from 'shared/const/router';

interface UserCreatePageProps {
  className?: string;
}

export const UserCreatePage: FC<UserCreatePageProps> = memo(() => {
  const { t } = useTranslation('users');
  const [userParams, setUserParams] = useState<Partial<IUser>>({});
  const onUpdateForm = useCallback(
    (form: Partial<IUser>) => {
      setUserParams((prev) => ({
        ...prev,
        ...form,
      }));
    },
    [setUserParams]
  );

  const { request, isLoading } = useFetch();

  const navigation = useNavigate();
  const onSave = useCallback(() => {
    request<IUser>('/api/users', {
      method: 'post',
      body: {
        ...userParams,
      },
    }).then((res) => {
      if (res) navigation(getRouteShowUser(res.id));
    });
  }, [userParams, request, navigation]);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [inputRef]);

  return (
    <AccountLayout>
      <Typography level="h1">{t('create_users.title')}</Typography>
      <UserForm
        userParams={userParams}
        onUpdate={onUpdateForm}
        inputRef={inputRef}
      >
        <Button
          onClick={onSave}
          loading={isLoading}
        >
          {t('user_form.saveBtn')}
        </Button>
      </UserForm>
    </AccountLayout>
  );
});

export default UserCreatePage;
