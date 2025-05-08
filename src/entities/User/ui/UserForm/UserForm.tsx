import { memo, ReactNode, useCallback, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { IUser } from '../../types/user';
import cls from './UserForm.module.scss';
import { Card, Divider, FormControl, FormLabel, Input } from '@mui/joy';

interface UserFormProps {
  className?: string;
  userParams: Partial<IUser>;
  onUpdate?: (param: Partial<IUser>) => void;
  children?: ReactNode;
}

export const UserForm: FC<UserFormProps> = memo((props) => {
  const { t } = useTranslation('users');

  const { className, userParams, onUpdate, children } = props;

  const onChange = useCallback(
    (field: keyof IUser, value: IUser[keyof IUser]) => {
      onUpdate?.({
        ...userParams,
        [field]: value,
      });
    },
    [onUpdate, userParams]
  );

  return (
    <div className={classNames(cls.UserForm, { additional: [className] })}>
      <Card>
        <FormControl>
          <FormLabel>{t('user_form.email.label')}</FormLabel>
          <Input
            placeholder={t('user_form.email.placeholder')}
            value={userParams?.email || ''}
            onChange={(e) => {
              onChange('email', e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>{t('user_form.password.label')}</FormLabel>
          <Input
            placeholder={t('user_form.password.placeholder')}
            value={userParams?.password || ''}
            type="password"
            onChange={(e) => {
              onChange('password', e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>{t('user_form.firstname.label')}</FormLabel>
          <Input
            placeholder={t('user_form.firstname.placeholder')}
            value={userParams?.firstname || ''}
            onChange={(e) => {
              onChange('firstname', e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>{t('user_form.surname.label')}</FormLabel>
          <Input
            placeholder={t('user_form.surname.placeholder')}
            value={userParams?.surname || ''}
            onChange={(e) => {
              onChange('surname', e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>{t('user_form.lastname.label')}</FormLabel>
          <Input
            placeholder={t('user_form.lastname.placeholder')}
            value={userParams?.lastname || ''}
            onChange={(e) => {
              onChange('lastname', e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>{t('user_form.document_number.label')}</FormLabel>
          <Input
            placeholder={t('user_form.document_number.placeholder')}
            value={userParams?.document_number || ''}
            onChange={(e) => {
              onChange('document_number', e.target.value);
            }}
          />
        </FormControl>
        <Divider />
        {children}
      </Card>
    </div>
  );
});
