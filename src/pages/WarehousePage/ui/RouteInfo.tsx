import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { IRoute, RouteInfoCard } from 'entities/Route';
import { Error, Warning } from '@mui/icons-material';
import { Typography } from '@mui/joy';
import { RouteAssigneUser } from 'features/RouteAssigneUser';

interface RouteInfoProps {
  className?: string;
  route: IRoute | null | undefined;
  onChangeRouteAssigne: () => void;
  notFoundErrorText: string;
  warningText: string;
  title: string;
}

export const RouteInfo: FC<RouteInfoProps> = (props) => {
  const { className, route, onChangeRouteAssigne, notFoundErrorText, warningText, title } = props;
  // t('WarehousePage.to_route_not_assigne.not_found')

  return (
    <div className={classNames('routeInfo', { additional: [className] })}>
      {!route ? (
        <Typography
          color="danger"
          startDecorator={<Error />}
        >
          {notFoundErrorText}
        </Typography>
      ) : (
        <>
          <RouteInfoCard
            route={route}
            title={title}
          >
            {!route.user_id && (
              <>
                <Typography
                  color="warning"
                  startDecorator={<Warning />}
                  endDecorator={<Warning />}
                >
                  {warningText}
                </Typography>
                <RouteAssigneUser
                  routeId={route?.id}
                  onSavedCallback={onChangeRouteAssigne}
                />
              </>
            )}
          </RouteInfoCard>
        </>
      )}
    </div>
  );
};
