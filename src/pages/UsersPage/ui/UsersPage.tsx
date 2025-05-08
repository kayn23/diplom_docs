import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UsersPage.module.scss';
import { useGetUserList, UserInfoCard } from 'entities/User';
import { AccountLayout } from 'app/layouts/AccountLayout';
import { Divider, Stack, Typography } from '@mui/joy';
import { RoleFinder } from './RoleFinder';
import { UserFullNameFinder } from './UserFullNameFinder';

interface UsersPageProps {
  className?: string;
}

export const UsersPage: FC<UsersPageProps> = (props) => {
  const { t } = useTranslation('users');

  const { className } = props;

  const { users, isLoading, userFilters, setUserFilter } = useGetUserList();

  return (
    <AccountLayout className={classNames(cls.UsersPage, { additional: [className] })}>
      <Typography level="h1">{t('UsersPage.title')}</Typography>

      <Stack
        direction="column"
        gap="8px"
      >
        <Stack gap={'8px'}>
          <RoleFinder
            selectedRole={userFilters.roles}
            setSelectedRole={(val) => setUserFilter('roles', val)}
          />
          <UserFullNameFinder
            emailOrFullName={userFilters.email_or_full_name_cont}
            onChange={(val) => setUserFilter('email_or_full_name_cont', val)}
          />
        </Stack>
        <Divider />
        <Stack
          direction="column"
          gap={'8px'}
        >
          {!isLoading &&
            users.map((user) => (
              <UserInfoCard
                user={user}
                key={user.id}
                showRole
                showMoreButton
              />
            ))}
        </Stack>
      </Stack>
    </AccountLayout>
  );
};

export default UsersPage;
