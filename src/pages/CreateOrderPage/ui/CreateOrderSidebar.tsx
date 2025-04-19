import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CreateOrderSidebar.module.scss';
import { Stack } from '@mui/joy';
import { BackLink } from 'shared/ui/BackLink';

interface CreateOrderSidebarProps {
  className?: string;
}

export const CreateOrderSidebar: FC<CreateOrderSidebarProps> = (props) => {
  const { className } = props;

  return (
    <Stack className={classNames(cls.CreateOrderSidebar, { additional: [className] })}>
      <BackLink />
    </Stack>
  );
};
