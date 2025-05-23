import type { FC, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UserInfoCard.module.scss';
import { Card, Link, Skeleton, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { getRouteShowUser } from 'shared/const/router';
import { IUser } from '../../types/user';
import { useHightRole } from '../../lib/useHightRole';

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
  const { t } = useTranslation('users');

  const isHightRole = useHightRole();

  return (
    <Card className={classNames(cls.UserInfoCard, { additional: [className] })}>
      {title}
      <Typography>
        <Skeleton
          loading={isLoading}
          variant="text"
          width="80%"
        >
          <Typography>{t('previewCard.email.title')}: </Typography>
          <Typography level="title-md">{user?.email}</Typography>
        </Skeleton>
      </Typography>
      {user?.lastname && user?.firstname && (
        <Typography>
          <Typography>{t('previewCard.FIO.title')}: </Typography>
          <Typography level="title-md">{`${user.lastname} ${user.firstname} ${user?.surname || ''}`}</Typography>
        </Typography>
      )}
      {isHightRole && user?.document_number && (
        <Typography>
          <Typography>{t('previewCard.documentNumber.title')}: </Typography>
          <Typography level="title-md">{user.document_number}</Typography>
        </Typography>
      )}
      {showRole && (
        <Typography>
          <Skeleton
            loading={isLoading}
            variant="text"
            width="40%"
          >
            <Typography>{t('previewCard.roles.title')}: </Typography>
            <Typography level="title-md">{user?.roles.map((role) => t(`roles.${role}`)).join(', ')}</Typography>
          </Skeleton>
        </Typography>
      )}
      {showMoreButton && <Link href={getRouteShowUser(user?.id)}>{t('previewCard.showMore')}</Link>}
    </Card>
  );
};
