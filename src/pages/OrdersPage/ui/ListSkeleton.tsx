import { Skeleton, Stack } from '@mui/joy';
import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

interface ListSkeletonProps {
  className?: string;
}

export const ListSkeleton: FC<ListSkeletonProps> = (props) => {
  const { className } = props;

  return (
    <Stack
      className={classNames('list-skeleton', { additional: [className] })}
      sx={{ width: '100%' }}
      gap="8px"
    >
      {[1, 2, 3].map(() => (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={64}
        />
      ))}
    </Stack>
  );
};
