import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UserFullNameFinder.module.scss';
import { FormControl, FormLabel, Input } from '@mui/joy';
import { useDebouncedCallback } from 'shared/lib/debounceFunction/debounceFunc';

interface UserFullNameFinderProps {
  className?: string;
  emailOrFullName?: string | undefined;
  onChange: (value: string) => void;
}

export const UserFullNameFinder: FC<UserFullNameFinderProps> = (props) => {
  const { t } = useTranslation('users');

  const { className, emailOrFullName, onChange } = props;

  const onInputChange = useDebouncedCallback((val: string) => {
    onChange(val);
  }, 300);

  return (
    <div className={classNames(cls.UserFullNameFinder, { additional: [className] })}>
      <FormControl>
        <FormLabel>{t('filters.email_or_full_name.title')}</FormLabel>
        <Input
          placeholder={t('filters.email_or_full_name.placeholder')}
          value={emailOrFullName}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </FormControl>
    </div>
  );
};
