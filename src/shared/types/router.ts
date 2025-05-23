import { Roles } from 'entities/User';
import { RouteProps } from 'react-router';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: Roles[];
};
