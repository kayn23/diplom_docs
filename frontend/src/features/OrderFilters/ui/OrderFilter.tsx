import { ChangeEvent, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Autocomplete, Checkbox, FormControl, FormLabel, Input, Stack } from '@mui/joy';
import { OrderFilters, statuses, type status } from 'entities/Order';
import { getUserId } from 'entities/User';
import { useSelector } from 'react-redux';
import { useDebounceCallback } from 'usehooks-ts';

interface OrderFilterProps {
  className?: string;
  value: OrderFilters;
  onSetFilter: (key: keyof OrderFilters, value: OrderFilters[keyof OrderFilters]) => void;
}

export const OrderFilter: FC<OrderFilterProps> = (props) => {
  const { t } = useTranslation('orders');
  const { className, value, onSetFilter } = props;

  const userId = useSelector(getUserId);

  const senderLabel = useMemo(() => t('OrderFilters.sender.placeholder'), [t]);
  const receiverLabel = useMemo(() => t('OrderFilters.receiver.placeholder'), [t]);

  const onInputId = useDebounceCallback((e: ChangeEvent<HTMLInputElement>) => {
    onSetFilter('id', e.target.value);
  }, 300);

  return (
    <Stack
      className={classNames('OrderFilter', { additional: [className] })}
      gap="8px"
    >
      <FormControl>
        <FormLabel>{t('OrderFilters.id.label')}</FormLabel>
        <Input
          placeholder={t('OrderFilters.id.placeholder')}
          onChange={onInputId}
        />
      </FormControl>
      <Autocomplete
        options={statuses}
        multiple
        onChange={(_, data) => {
          onSetFilter('status', (data as status[]) || []);
        }}
        getOptionLabel={(option) => t(`statuses.${option}`)}
        sx={{ marginBottom: '8px' }}
        placeholder={t('OrderFilters.status.placeholder')}
        value={value.status}
      />
      <Checkbox
        label={senderLabel}
        onChange={(e) => (e.target.checked ? onSetFilter('sender_id', userId) : onSetFilter('sender_id', undefined))}
      />
      <Checkbox
        label={receiverLabel}
        onChange={(e) =>
          e.target.checked ? onSetFilter('receiver_id', userId) : onSetFilter('receiver_id', undefined)
        }
      />
    </Stack>
  );
};
