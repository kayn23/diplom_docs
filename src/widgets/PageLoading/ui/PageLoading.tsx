import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PageLoading.module.scss';
import { Loader } from 'shared/ui/Loader/Loader';

interface PageLoadingProps {
  className?: string;
}

export const PageLoading: FC<PageLoadingProps> = ({ className }) => {
  return (
    <div className={classNames(cls.PageLoading, { additional: [className] })}>
      <Loader />
    </div>
  );
};
