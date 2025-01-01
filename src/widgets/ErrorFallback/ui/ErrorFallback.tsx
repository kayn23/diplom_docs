import { Suspense, type FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ErrorFallback.module.scss';
import { useTheme } from 'shared/config/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/ui/Button';

interface ErrorFallbackProps {
  className?: string;
}

export const ErrorFallback: FC<ErrorFallbackProps> = ({ className }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const reload = () => {
    location.reload();
  };
  return (
    <Suspense fallback="">
      <div className={classNames(cls.ErrorFallback, { additional: [className, theme] })}>
        <p>{t('errors.fallbackTitle')}</p>
        <Button onClick={reload}>{t('buttons.reload')}</Button>
      </div>
    </Suspense>
  );
};
