import type { FC } from 'react';
import { Stack } from '@mui/joy';
import { BackLink } from 'shared/ui/BackLink';
import { classNames } from 'shared/lib/classNames/classNames';

interface CreateOrderSidebarProps {
  className?: string;
}

export const EditOrderSidebar: FC<CreateOrderSidebarProps> = (props) => {
  const { className } = props;

  return (
    <Stack className={classNames('editSidebar', { additional: [className] })}>
      <BackLink />
    </Stack>
  );
};
