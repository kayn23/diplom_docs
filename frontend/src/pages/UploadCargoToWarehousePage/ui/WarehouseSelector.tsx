import { Button, Stack, Typography } from '@mui/joy';
import { IWarehouse, WarehouseSelectAutocompletu } from 'entities/Worehouse';
import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WarehouseSelector.module.scss';

interface WarehouseSelectorProps {
  className?: string;
  warehouse: IWarehouse | null;
  onUpdate: (value: IWarehouse | null) => void;
}

export const WarehouseSelector: FC<WarehouseSelectorProps> = (props) => {
  const { t } = useTranslation('shippings');

  const { className, warehouse, onUpdate } = props;
  const [isEdit, setIsEdit] = useState(warehouse === null);
  const [localWarehouse, setLocalWarehouse] = useState<IWarehouse | null>(warehouse);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback(() => {
    onUpdate(null);
    setLocalWarehouse(null);
    setIsEdit(true);
  }, [onUpdate]);

  const onSelect = useCallback(
    (value: IWarehouse | null) => {
      onUpdate(value);
      if (!value) {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
    },
    [onUpdate]
  );

  useEffect(() => {
    if (isEdit) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isEdit]);

  return (
    <div className={classNames('WarehouseSelector', { additional: [className] })}>
      {isEdit ? (
        <Stack
          direction="row"
          gap="8px"
        >
          <WarehouseSelectAutocompletu
            showAllWarehouses
            onSelect={setLocalWarehouse}
            value={localWarehouse}
            inputRef={inputRef}
            className={cls.Autocomplete}
          />
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => onSelect(localWarehouse)}
          >
            {t('UploadCargoToWarehousePage.WarehouseSelector.okBtn')}
          </Button>
        </Stack>
      ) : (
        <Stack
          direction="row"
          gap="8px"
          alignItems="center"
        >
          <Typography>
            <Typography>{t('UploadCargoToWarehousePage.WarehouseSelector.label')}: </Typography>
            <Typography level="title-lg">
              {warehouse?.name}, {warehouse?.city}, {warehouse?.address}
            </Typography>
          </Typography>
          <Button
            variant="outlined"
            color="neutral"
            onClick={onChange}
          >
            {t('UploadCargoToWarehousePage.WarehouseSelector.changeBtn')}
          </Button>
        </Stack>
      )}
    </div>
  );
};
