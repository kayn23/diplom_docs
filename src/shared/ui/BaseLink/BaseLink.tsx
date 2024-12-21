import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './BaseLink.module.sass';
import { Link, LinkProps } from 'react-router';

interface BaseLinkProps extends LinkProps {
  className?: string;
}

export const BaseLink: FC<BaseLinkProps> = ({ className, children, ...props }) => {
  return (
    <Link className={classNames(cls.BaseLink, { additional: [className] })} {...props}>
      {children}
    </Link>
  );
};
