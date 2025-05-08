import type { FC, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UserInfoCard.module.scss';
import { IUser } from 'entities/User';
import { Card, Link, Skeleton, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { getRouteShowUser } from 'shared/const/router';

interface UserInfoCardProps {
  className?: string;
  user?: IUser;
  showRole?: boolean;
  showMoreButton?: boolean;
  title?: ReactNode;
  isLoading?: boolean;
}

export const UserInfoCard: FC<UserInfoCardProps> = (props) => {
  const { className, user, showRole = false, showMoreButton = false, title, isLoading = false } = props;
  const { t } = useTranslation();

  return (
    <Card className={classNames(cls.UserInfoCard, { additional: [className] })}>
      {title}
      <Typography>
        <Skeleton
          loading={isLoading}
          variant="text"
          width="80%"
        >
          <Typography>{t('users.previewCard.email.title')}: </Typography>
          <Typography level="title-md">{user?.email}</Typography>
        </Skeleton>
      </Typography>
      {user?.lastname && user?.firstname && (
        <Typography>
          <Typography>{t('users.previewCard.FIO.title')}: </Typography>
          <Typography level="title-md">{`${user.lastname} ${user.firstname} ${user?.surname || ''}`}</Typography>
        </Typography>
      )}
      {showRole && (
        <Typography>
          <Skeleton
            loading={isLoading}
            variant="text"
            width="40%"
          >
            <Typography>{t('users.previewCard.roles.title')}: </Typography>
            <Typography level="title-md">{user?.roles.map((role) => t(`users.roles.${role}`)).join(', ')}</Typography>
          </Skeleton>
        </Typography>
      )}
      {showMoreButton && <Link href={getRouteShowUser(user?.id)}>{t('buttons.showMore')}</Link>}
    </Card>
  );
};
