import { memo, ReactNode, useCallback, useEffect, useMemo, useState, type FC } from 'react';
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Stack, Typography } from '@mui/joy';
import { useFetch } from 'entities/User';
import { CargoCard, useGetCargos } from 'entities/Cargo';
// TODO убрать пересечение
import { CargoAttachModal } from 'features/CargoAttachModal';
import { status } from 'entities/Order';
import { Loader } from 'shared/ui/Loader/Loader';
import { Inventory2 } from '@mui/icons-material';
import cls from './CargoList.module.scss';
import { useTranslation } from 'react-i18next';
import { IssuedCargoButton } from 'features/IssuedCargoButton';

interface CargoListProps {
  className?: string;
  orderId: number;
  orderStatus: status;
  summaryChildren?: ReactNode;
  onUpdated?: () => void;
}

export const CargoList: FC<CargoListProps> = memo((props) => {
  const { t } = useTranslation();
  const { orderId, orderStatus, summaryChildren, onUpdated } = props;

  const { data: cargos, isLoading, onReload } = useGetCargos(orderId);

  useEffect(() => {
    if (cargos.every((i) => i.status === 'issued')) onUpdated?.();
  }, [cargos, onUpdated]);

  const { request: deleteRequest } = useFetch();
  const onDelete = useCallback(
    (orderId: number, id: number) => {
      deleteRequest(`/api/orders/${orderId}/cargos/${id}`, {
        method: 'delete',
      }).then(() => {
        onReload();
      });
    },
    [deleteRequest, onReload]
  );

  const canChange = useMemo(() => orderStatus === 'created', [orderStatus]);
  const canDelete = useMemo(() => ['created', 'wait_payment'].includes(orderStatus), [orderStatus]);

  const cargoList = useMemo(
    () =>
      cargos.map((cargo) => (
        <CargoCard
          key={cargo.id}
          cargo={cargo}
          canDelete={canDelete}
          onDelete={(id) => onDelete(orderId, id)}
        />
      )),
    [cargos, canDelete, onDelete, orderId]
  );

  const [isCargoAccordionOpen, setIsCargoAccordionOpen] = useState(false);

  return (
    <>
      <AccordionGroup>
        <Accordion
          expanded={isCargoAccordionOpen}
          onChange={(_, expanded) => setIsCargoAccordionOpen?.(expanded)}
        >
          <AccordionSummary>
            <div className={cls.cargosSummary}>
              <Typography
                level="h2"
                endDecorator={<Inventory2 />}
              >
                {t('orders:OrdersPage.titles.cargos')}
              </Typography>
            </div>
          </AccordionSummary>
          <Stack
            direction="row"
            gap="8px"
            sx={{ padding: '8px 0' }}
            onClick={(e) => e.stopPropagation()}
          >
            {canChange && (
              <>
                <CargoAttachModal
                  orderId={orderId}
                  onCreated={onReload}
                />
                {cargos.length > 0 && summaryChildren}
              </>
            )}
            {orderStatus === 'awaiting_pickup' && (
              <IssuedCargoButton
                orderId={orderId}
                onUpdated={onReload}
              />
            )}
          </Stack>
          <AccordionDetails>
            {isCargoAccordionOpen && (
              <Stack spacing={2}>
                {isLoading && <Loader />}
                {!isLoading && cargoList}
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </>
  );
});
