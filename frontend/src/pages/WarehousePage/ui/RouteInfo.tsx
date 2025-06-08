import { type FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { IRoute, RouteInfoCard } from 'entities/Route';
import { Error, Warning } from '@mui/icons-material';
import { Typography } from '@mui/joy';
import { RouteAssigneUser } from 'features/RouteAssigneUser';

interface RouteInfoProps {
  className?: string;
  route: IRoute | null | undefined;
  notFoundErrorText: string;
  warningText: string;
  title: string;
  onUpdated?: () => void;
}

export const RouteInfo: FC<RouteInfoProps> = (props) => {
  const { className, route, onUpdated, notFoundErrorText, warningText, title } = props;
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
            onUpdated={onUpdated}
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
                  onSavedCallback={onUpdated}
                />
              </>
            )}
          </RouteInfoCard>
        </>
      )}
    </div>
  );
};
