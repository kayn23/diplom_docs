import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Typography } from '@mui/joy';

interface ErrorMessageProps {
  className?: string;
  error: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  const { t } = useTranslation();

  const { className, error } = props;

  return (
    <Typography className={classNames('ErrorMessage', { additional: [className] })}>{t(`errors.${error}`)}</Typography>
  );
};
