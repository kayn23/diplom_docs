import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ICargo } from '../types/type';
import { Card, IconButton, Skeleton, Stack, Typography } from '@mui/joy';
import cls from './CargoCard.module.scss';
import { Delete, QrCode } from '@mui/icons-material';
import { QrCodeModal } from './QrCodeModal';
import { useAdmin } from 'entities/User';

interface CargoCargProps {
  className?: string;
  cargo?: ICargo;
  isLoading?: boolean;
  canDelete?: boolean;
  onDelete?: (id: number) => void;
}

export const CargoCard: FC<CargoCargProps> = (props) => {
  const { t } = useTranslation('cargos');

  const { className, isLoading = false, cargo, canDelete = false, onDelete } = props;
  const [showQrcodeModal, setShowQrcodeModal] = useState(false);

  const isAdmin = useAdmin();

  return (
    <Card className={classNames('CargoCard', { additional: [className] })}>
      <Stack
        direction="row"
        sx={{ width: '100%' }}
      >
        <div style={{ flexGrow: 2 }}>
          <Typography>
            <Skeleton
              loading={isLoading}
              variant="text"
              width="80%"
            >
              <Typography>{t('card.id')}: </Typography>
              <Typography level="title-md">{cargo?.id}</Typography>
            </Skeleton>
          </Typography>
          <Typography>
            <Skeleton
              loading={isLoading}
              variant="text"
              width="80%"
            >
              <Typography>{t('card.size')}: </Typography>
              <Typography level="title-md">{cargo?.size}</Typography>
            </Skeleton>
          </Typography>
          <Typography>
            <Skeleton
              loading={isLoading}
              variant="text"
              width="80%"
            >
              <Typography>{t('card.dimensions')}: </Typography>
              <Typography level="title-md">{cargo?.dimensions}</Typography>
            </Skeleton>
          </Typography>
          <Typography>
            <Skeleton
              loading={isLoading}
              variant="text"
              width="80%"
            >
              {cargo?.description && (
                <>
                  <Typography>{t('card.description')}: </Typography>
                  <Typography level="title-md">{cargo?.description}</Typography>
                </>
              )}
            </Skeleton>
          </Typography>
          <Typography>
            <Skeleton
              loading={isLoading}
              variant="text"
              width="80%"
            >
              <Typography>{t('card.status')}: </Typography>
              <Typography level="title-md">{t(`status.${cargo?.status}`)}</Typography>
            </Skeleton>
          </Typography>
        </div>
        {cargo && isAdmin && (
          <div className={cls.buttons}>
            <IconButton onClick={() => setShowQrcodeModal(true)}>
              <QrCode></QrCode>
            </IconButton>
            {canDelete && (
              <IconButton
                color="danger"
                variant="solid"
                onClick={() => onDelete?.(cargo.id)}
              >
                <Delete />
              </IconButton>
            )}
          </div>
        )}
      </Stack>
      {cargo && showQrcodeModal && (
        <QrCodeModal
          src={cargo.qrcode || ''}
          setOpen={setShowQrcodeModal}
        />
      )}
    </Card>
  );
};
