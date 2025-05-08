import { ReactNode, useCallback, useEffect, useMemo, useState, type FC } from 'react';
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Stack, Typography } from '@mui/joy';
import { useFetch } from 'entities/User';
import { CargoCard, ICargo } from 'entities/Cargo';
// TODO убрать пересечение
import { CargoAttachModal } from 'features/CargoAttachModal';
import { status } from 'entities/Order';
import { Loader } from 'shared/ui/Loader/Loader';
import { Inventory2 } from '@mui/icons-material';
import cls from './CargoList.module.scss';
import { useTranslation } from 'react-i18next';

interface CargoListProps {
  className?: string;
  orderId: number;
  orderStatus: status;
  summaryChildren?: ReactNode;
}

export const CargoList: FC<CargoListProps> = (props) => {
  const { t } = useTranslation();
  const { orderId, orderStatus, summaryChildren } = props;

  // TODO добавить пагинацию
  const { request, isLoading } = useFetch();
  const [cargos, setCargos] = useState<ICargo[]>([]);

  const getCargoList = useCallback(
    (orderId: string | number, page: number = 1) => {
      request<ICargo[]>(`/api/orders/${orderId}/cargos?page=${page}`).then((res) => {
        if (res) setCargos(res);
      });
    },
    [request]
  );

  const { request: deleteRequest } = useFetch();
  const onDelete = useCallback(
    (orderId: number, id: number) => {
      deleteRequest(`/api/orders/${orderId}/cargos/${id}`, {
        method: 'delete',
      }).then(() => {
        getCargoList(orderId);
      });
    },
    [deleteRequest, getCargoList]
  );

  const onCreatedCallback = useCallback(() => {
    getCargoList(orderId);
  }, [getCargoList, orderId]);

  useEffect(() => {
    getCargoList(orderId);
  }, [getCargoList, orderId]);

  const canChange = useMemo(() => orderStatus === 'created', [orderStatus]);

  const cargoList = useMemo(
    () =>
      cargos.map((cargo) => (
        <CargoCard
          key={cargo.id}
          cargo={cargo}
          canDelete={canChange}
          onDelete={(id) => onDelete(orderId, id)}
        />
      )),
    [cargos, canChange, orderId, onDelete]
  );
  const [isCargoAccordionOpen, setIsCargoAccordionOpen] = useState(false);

  return (
    <>
      <AccordionGroup>
        <Accordion
          expanded={isCargoAccordionOpen}
          onChange={(_, expanded) => setIsCargoAccordionOpen(expanded)}
        >
          <AccordionSummary>
            <div className={cls.cargosSummary}>
              <Typography
                level="h2"
                endDecorator={<Inventory2 />}
              >
                {t('orders:OrdersPage.titles.cargos')}
              </Typography>
              {canChange && (
                <>
                  <CargoAttachModal
                    orderId={orderId}
                    onCreated={onCreatedCallback}
                  />
                  {cargos.length > 0 && summaryChildren}
                </>
              )}
            </div>
          </AccordionSummary>
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
};
