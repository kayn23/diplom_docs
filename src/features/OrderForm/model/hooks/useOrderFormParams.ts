import { ICreateOrderParams } from 'entities/Order';
import { useCallback, useState } from 'react';

export const useOrderFormParams = (initOrderParam: Partial<ICreateOrderParams> = {}) => {
  const [orderParams, setOrderParams] = useState<Partial<ICreateOrderParams>>(initOrderParam);

  const onUpdateForm = useCallback(
    (form: Partial<ICreateOrderParams>) => {
      setOrderParams((prev) => ({
        ...prev,
        ...form,
      }));
    },
    [setOrderParams]
  );

  return {
    orderParams,
    onUpdateForm,
  };
};
