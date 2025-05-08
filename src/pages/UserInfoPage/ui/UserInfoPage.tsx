import { useCallback, useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UserInfoPage.module.scss';
import { Box, Typography } from '@mui/joy';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { useParams } from 'react-router';
import { IUser, useAdmin, useFetch, UserInfoCard } from 'entities/User';
import { BackLink } from 'shared/ui/BackLink';
import { UserAddRole } from 'features/UserAddRole';

interface UserInfoPageProps {
  className?: string;
}

export const UserInfoPage: FC<UserInfoPageProps> = (props) => {
  const { t } = useTranslation('users');

  const { className } = props;

  const { userId } = useParams();
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const { request, isLoading } = useFetch();
  const getUserInfo = useCallback(
    (userId: string | number) => {
      request<IUser>(`/api/users/${userId}`).then((res) => {
        if (res) {
          setUser(res);
        }
      });
    },
    [setUser, request]
  );

  useEffect(() => {
    if (userId) {
      getUserInfo(userId);
    }
  }, [getUserInfo, userId]);

  const isAdmin = useAdmin();

  const onRoleChanged = useCallback(() => {
    if (userId) getUserInfo(userId);
  }, [getUserInfo, userId]);

  return (
    <AccountLayout className={classNames(cls.UserInfoPage, { additional: [className] })}>
      <BackLink />
      <Typography level="h1">{t('showPage.title', { userId })}</Typography>

      <UserInfoCard
        showRole
        user={user}
        isLoading={isLoading}
      />
      {userId && isAdmin && user && (
        <Box sx={{ marginTop: '8px' }}>
          <UserAddRole
            user={user}
            onSaved={onRoleChanged}
          />
        </Box>
      )}
    </AccountLayout>
  );
};

export default UserInfoPage;
