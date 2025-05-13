import { useCallback, useMemo, type FC, type ReactNode, type Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { IVehicle } from 'entities/Vehicle';
import { Card, Checkbox, Divider, FormControl, FormLabel, Input, VariantProp } from '@mui/joy';
import { NumericFormatAdapter } from 'shared/ui/NumericFormatAdapter';

interface CarFormProps {
  children?: ReactNode;
  className?: string;
  car: Partial<IVehicle>;
  onUpdate?: (car: Partial<IVehicle>) => void;
  inputRef?: Ref<HTMLInputElement>;
  disabled?: boolean;
  variant?: 'plain' | 'default';
}

export const CarForm: FC<CarFormProps> = (props) => {
  const { t } = useTranslation('cars');

  const { className, children, car, onUpdate, inputRef, disabled = false, variant = 'default' } = props;

  const onChange = useCallback(
    (field: keyof IVehicle, value: IVehicle[keyof IVehicle]) => {
      console.log(field, value);
      onUpdate?.({
        ...car,
        [field]: value,
      });
    },
    [onUpdate, car]
  );

  const cardProps = useMemo(() => {
    if (variant === 'plain')
      return {
        variant: 'plain' as VariantProp,
        sx: {
          padding: 0,
        },
      };
    return {};
  }, [variant]);

  return (
    <Card
      {...cardProps}
      className={classNames('CarForm', { additional: [className] })}
    >
      <FormControl id="name">
        <FormLabel>{t('form.name.label')}</FormLabel>
        <Input
          slotProps={{
            input: {
              ref: inputRef,
            },
          }}
          placeholder={t('form.name.placeholder')}
          value={car?.name || ''}
          onChange={(e) => {
            onChange('name', e.target.value);
          }}
          disabled={disabled}
        />
      </FormControl>

      <FormControl id="size">
        <FormLabel>{t('form.size.label')}</FormLabel>
        <Input
          slotProps={{
            input: {
              component: NumericFormatAdapter,
            },
          }}
          placeholder={t('form.size.placeholder')}
          value={car?.capacity || ''}
          onChange={(e) => {
            onChange('capacity', e.target.value);
          }}
          disabled={disabled}
        />
      </FormControl>
      <FormControl id="capacity">
        <FormLabel>{t('form.capacity.label')}</FormLabel>
        <Input
          slotProps={{
            input: {
              component: NumericFormatAdapter,
            },
          }}
          placeholder={t('form.capacity.placeholder')}
          value={car?.load_capacity || ''}
          onChange={(e) => {
            onChange('load_capacity', e.target.value);
          }}
          disabled={disabled}
        />
      </FormControl>
      <FormControl id="active">
        <Checkbox
          checked={car?.active || false}
          label={t('form.active.label')}
          onChange={(e) => onChange('active', e.target.checked)}
        />
      </FormControl>
      <Divider />
      {children}
    </Card>
  );
};
