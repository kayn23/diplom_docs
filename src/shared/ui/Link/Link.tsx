import type { FC, ReactNode } from 'react';
import { Link as NavLink } from 'react-router';
import { Link as LinkJoy, LinkProps as JoyLinkProps } from '@mui/joy';

interface LinkProps extends JoyLinkProps {
  to?: string;
  children?: ReactNode;
}

export const Link: FC<LinkProps> = (props) => {
  const { to, children, ...otherProps } = props;

  return (
    <>
      {to ? (
        <NavLink to={to}>
          <LinkJoy {...otherProps}>{children}</LinkJoy>
        </NavLink>
      ) : (
        <LinkJoy {...otherProps}>{children}</LinkJoy>
      )}
    </>
  );
};
