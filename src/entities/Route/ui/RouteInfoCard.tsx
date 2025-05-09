import { ReactNode, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './RouteInfoCard.module.scss';
import { IRoute } from '../types/route';
import { Card, Link, Typography } from '@mui/joy';
import { getWeekdayName } from 'shared/lib/weekday';
import { getRouteShowUser } from 'shared/const/router';

interface RouteInfoCardProps {
  className?: string;
  route: IRoute;
  title?: string;
  children?: ReactNode;
}

export const RouteInfoCard: FC<RouteInfoCardProps> = (props) => {
  const { t } = useTranslation();

  const { className, route, title, children } = props;

  const deliveryDays = useMemo(
    () => route.delivery_days.map((day) => t(`weekdays.${getWeekdayName(day)}`)).join(', '),
    [route, t]
  );

  return (
    <Card className={classNames(cls.RouteInfoCard, { additional: [className] })}>
      {title && <Typography level="title-lg">{title}</Typography>}
      <Typography>
        <Typography level="title-lg">{t('routeInfoCard.deliveryDay.title')}: </Typography>
        <Typography level="body-lg">{deliveryDays}</Typography>
      </Typography>

      {route.user_id && (
        <Link
          href={getRouteShowUser(route.user_id)}
          level="body-lg"
        >
          {t('routeInfoCard.showUserInfo')}
        </Link>
      )}
      {children}
    </Card>
  );
};
