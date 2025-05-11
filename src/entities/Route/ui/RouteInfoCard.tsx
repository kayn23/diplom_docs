import { ReactNode, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './RouteInfoCard.module.scss';
import { IRoute } from '../types/route';
import { Card, Link, Stack, Typography } from '@mui/joy';
import { getWeekdayName } from 'shared/lib/weekday';
import { getRouteShowUser } from 'shared/const/router';
import { Error } from '@mui/icons-material';
import { SetWeekdayModal } from './SetWeekdayModal';

interface RouteInfoCardProps {
  className?: string;
  route: IRoute;
  title?: string;
  children?: ReactNode;
  onUpdated?: () => void;
}

export const RouteInfoCard: FC<RouteInfoCardProps> = (props) => {
  const { t } = useTranslation();

  const { className, route, title, children, onUpdated } = props;

  const deliveryDays = useMemo(() => {
    if (route.delivery_days.length > 0)
      return route.delivery_days.map((day) => t(`weekdays.${getWeekdayName(day)}`)).join(', ');
    else
      return (
        <Typography
          color="danger"
          startDecorator={<Error />}
          endDecorator={<Error />}
        >
          {t('routeInfoCard.deliveryDay.noDeliveryDay')}
        </Typography>
      );
  }, [route, t]);

  return (
    <Card className={classNames(cls.RouteInfoCard, { additional: [className] })}>
      {title && <Typography level="title-lg">{title}</Typography>}
      <Stack
        direction="row"
        gap="8px"
        alignItems="center"
      >
        <Typography>
          <Typography level="title-lg">{t('routeInfoCard.deliveryDay.title')}: </Typography>
          <Typography level="body-lg">{deliveryDays}</Typography>
        </Typography>
        <SetWeekdayModal
          route={route}
          onUpdated={onUpdated}
        />
      </Stack>

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
