import type { FC, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UserInfoCard.module.scss';
import { IUser } from 'entities/User/model/types/user';
import { Card, Link, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';

interface UserInfoCardProps {
  className?: string;
  user: IUser;
  showRole?: boolean;
  showMoreButton?: boolean;
  title?: ReactNode;
}

export const UserInfoCard: FC<UserInfoCardProps> = (props) => {
  const { className, user, showRole = false, showMoreButton = false, title } = props;
  const { t } = useTranslation();

  const { email, firstname, surname, lastname } = user;

  return (
    <Card className={classNames(cls.UserInfoCard, { additional: [className] })}>
      {title}
      <Typography>
        <Typography>{t('users.previewCard.email.title')}: </Typography>
        <Typography level="title-md">{email}</Typography>
      </Typography>
      {lastname && firstname && (
        <Typography>
          <Typography>{t('users.previewCard.FIO.title')}: </Typography>
          <Typography level="title-md">{`${lastname} ${firstname} ${surname || ''}`}</Typography>
        </Typography>
      )}
      {showRole && (
        <Typography>
          <Typography>{t('users.previewCard.roles.title')}: </Typography>
          <Typography level="title-md">{user.roles.join(', ')}</Typography>
        </Typography>
      )}
      {showMoreButton && <Link>{t('buttons.showMore')}</Link>}
    </Card>
  );
};
