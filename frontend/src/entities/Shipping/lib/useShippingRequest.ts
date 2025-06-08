import { useCallback, useEffect, useMemo, useState } from 'react';
import { IShippingDetails } from '../types/shipping';
import { useFetch } from 'entities/User';

export const useShippingRequest = (id: number | string) => {
  const [shipping, setShipping] = useState<IShippingDetails>();

  const { request, isLoading: getLoading } = useFetch();

  const getShipping = useCallback(
    (id: number | string) => {
      request<IShippingDetails>(`/api/shippings/${id}`).then((res) => {
        if (!res) return;
        setShipping(res);
      });
    },
    [request]
  );

  const { request: requestLoad, isLoading: loadLoading } = useFetch();
  const startLoad = useCallback(() => {
    requestLoad<IShippingDetails>(`/api/shippings/${id}/start_load`, { method: 'post' }).then((res) => {
      if (!res) return;
      setShipping(res);
    });
  }, [requestLoad, id]);

  const { request: requestDelivery, isLoading: deliveryLoading } = useFetch();
  const startDelivery = useCallback(() => {
    requestDelivery<IShippingDetails>(`/api/shippings/${id}/start_delivery`, { method: 'post' }).then((res) => {
      if (!res) return;
      setShipping(res);
    });
  }, [id, requestDelivery]);

  const onReload = useCallback(() => {
    getShipping(id);
  }, [getShipping, id]);

  useEffect(() => {
    onReload();
  }, [onReload]);

  const isLoading = useMemo(
    () => getLoading || loadLoading || deliveryLoading,
    [getLoading, loadLoading, deliveryLoading]
  );

  return {
    isLoading,
    shipping,

    onReload,
    startLoad,
    startDelivery,
  };
};
