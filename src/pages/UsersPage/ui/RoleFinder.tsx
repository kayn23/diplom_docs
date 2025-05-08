import { SyntheticEvent, useCallback, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './RoleFinder.module.scss';
import { Autocomplete, FormControl, FormLabel } from '@mui/joy';
import { roles, Roles } from 'entities/User';

interface RoleFinderProps {
  className?: string;
  selectedRole: Roles[] | undefined;
  setSelectedRole: (role: Roles[]) => void;
}

export const RoleFinder: FC<RoleFinderProps> = (props) => {
  const { t } = useTranslation('users');

  const { className, setSelectedRole, selectedRole = [] } = props;
  const onChange = useCallback(
    (_e: SyntheticEvent, value: string[]) => {
      if (value) {
        setSelectedRole([...(value as Roles[])]);
      }
    },
    [setSelectedRole]
  );

  return (
    <div className={classNames(cls.RoleFinder, { additional: [className] })}>
      <FormControl>
        <FormLabel>{t('filters.roles.title')}</FormLabel>
        <Autocomplete
          multiple
          value={selectedRole}
          options={roles}
          placeholder={t('filters.roles.placeholder')}
          getOptionLabel={(option) => t(`roles.${option}`)}
          onChange={onChange}
        />
      </FormControl>
    </div>
  );
};
