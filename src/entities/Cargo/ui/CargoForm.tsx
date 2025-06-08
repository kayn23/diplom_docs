import { Ref, useCallback, type FC, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, FormLabel, Input, Stack } from '@mui/joy';
import { classNames } from 'shared/lib/classNames/classNames';
import { ICargo } from 'entities/Cargo/types/type';
import { NumericFormatAdapter } from 'shared/ui/NumericFormatAdapter';

interface CargoFormProps {
  children?: ReactNode;
  className?: string;
  onUpdate?: (cargo: Partial<ICargo>) => void;
  cargo: Partial<ICargo>;
  inputRef?: Ref<HTMLInputElement>;
}

export const CargoForm: FC<CargoFormProps> = (props) => {
  const { t } = useTranslation('cargos');

  const { children, className, onUpdate, cargo, inputRef } = props;

  const onChange = useCallback(
    (field: keyof ICargo, value: ICargo[keyof ICargo]) => {
      onUpdate?.({
        ...cargo,
        [field]: value,
      });
    },
    [onUpdate, cargo]
  );

  return (
    <Stack
      gap="8px"
      className={classNames('cargo_form', { additional: [className] })}
    >
      <FormControl id="dimensions">
        <FormLabel>{t('createForm.size.label')}</FormLabel>
        <Input
          slotProps={{
            input: {
              ref: inputRef,
              component: NumericFormatAdapter,
            },
          }}
          placeholder={t('createForm.size.placeholder')}
          value={cargo?.size || ''}
          onChange={(e) => {
            onChange('size', e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="dimensions">
        <FormLabel>{t('createForm.dimensions.label')}</FormLabel>
        <Input
          placeholder={t('createForm.dimensions.placeholder')}
          value={cargo?.dimensions || ''}
          slotProps={{
            input: {
              component: NumericFormatAdapter,
            },
          }}
          onChange={(e) => {
            onChange('dimensions', e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="description">
        <FormLabel>{t('createForm.description.label')}</FormLabel>
        <Input
          placeholder={t('createForm.description.placeholder')}
          value={cargo?.description || ''}
          onChange={(e) => {
            onChange('description', e.target.value);
          }}
        />
      </FormControl>
      {children}
    </Stack>
  );
};
