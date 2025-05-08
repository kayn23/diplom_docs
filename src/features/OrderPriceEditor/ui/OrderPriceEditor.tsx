import { ChangeEvent, useCallback, useMemo, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './OrderPriceEditor.module.scss';
import { ButtonGroup, IconButton, Input, Typography } from '@mui/joy';
import { Close, Done, Edit } from '@mui/icons-material';
import { useAdmin } from 'entities/User';
import { NumericFormatAdapter } from 'shared/ui/NumericFormatAdapter';
import { status } from 'entities/Order';

interface OrderPriceEditorProps {
  className?: string;
  status: status;
  price: string | null;
  onUpdatePrice?: (price: string) => void;
}

export const OrderPriceEditor: FC<OrderPriceEditorProps> = (props) => {
  const { t } = useTranslation();

  const { className, price, onUpdatePrice, status } = props;
  const isAdmin = useAdmin();

  const [isEdit, setIsEdit] = useState(false);
  const [priceInput, setPriceInput] = useState(price || '');

  const onChangePrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPriceInput(e.target.value);
    },
    [setPriceInput]
  );

  const onSave = useCallback(() => {
    onUpdatePrice?.(priceInput);
    setIsEdit(false);
  }, [onUpdatePrice, priceInput]);

  const onCancel = useCallback(() => {
    setPriceInput(price || '');
    setIsEdit(false);
  }, [setPriceInput, price, setIsEdit]);

  const canChange = useMemo(() => status === 'created', [status]);

  return (
    <div className={classNames(cls.OrderPriceEditor, { additional: [className] })}>
      <div className={cls.priceEditor}>
        <Typography>{t('orders:OrdersPage.titles.price')}</Typography>
        {!isEdit && (
          <>
            <Typography level="title-md">{price || t('orders:order.fields.price.null')}</Typography>
            {isAdmin && canChange && (
              <IconButton onClick={() => setIsEdit(true)}>
                <Edit />
              </IconButton>
            )}
          </>
        )}
        {isEdit && (
          <>
            {' '}
            <Input
              onChange={onChangePrice}
              autoFocus
              slotProps={{
                input: {
                  component: NumericFormatAdapter,
                },
              }}
              value={priceInput}
            />
            <ButtonGroup>
              <IconButton
                color="primary"
                variant="solid"
                onClick={onSave}
              >
                <Done />
              </IconButton>
              <IconButton
                color="danger"
                variant="solid"
                onClick={onCancel}
              >
                <Close />
              </IconButton>
            </ButtonGroup>
          </>
        )}
      </div>
    </div>
  );
};
