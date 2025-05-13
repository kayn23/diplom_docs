import { useState, useLayoutEffect, useRef, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { IconButton } from '@mui/joy';
import { QrCode } from '@mui/icons-material';
import { Modal, ModalDialog, ModalClose, Typography } from '@mui/joy';
import { Html5Qrcode } from 'html5-qrcode';

interface QrCodeScannerProps {
  className?: string;
  onScanned?: (value: string) => void;
}

export const QrCodeScanner: FC<QrCodeScannerProps> = ({ className, onScanned }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scannerStarted, setScannerStarted] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const onScan = useCallback(
    (value: string) => {
      setOpen(false); // Закрыть модалку после сканирования
      onScanned?.(value);
    },
    [onScanned]
  );

  const scan = useCallback(() => {
    if (scannerRef.current) {
      const qrRegionId = scannerRef.current.id;
      const html5QrCode = new Html5Qrcode(qrRegionId);
      html5QrCodeRef.current = html5QrCode;

      html5QrCode
        .start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            html5QrCode.stop().then(() => {
              onScan(decodedText);
            });
          },
          () => {
            // Можно логировать ошибки если нужно
          }
        )
        .catch((err) => {
          console.error('Ошибка запуска сканера:', err);
        });

      setScannerStarted(true);
    }
  }, [onScan]);

  const startScan = useCallback(() => {
    setOpen(true);
    setTimeout(() => scan(), 200);
  }, [scan]);

  useLayoutEffect(() => {
    // Очистка сканера при закрытии модального окна
    return () => {
      if (html5QrCodeRef.current?.isScanning) {
        html5QrCodeRef.current
          .stop()
          .then(() => html5QrCodeRef.current?.clear())
          .catch(() => {});
      }
      setScannerStarted(false); // Сброс флага при закрытии модалки
    };
  }, [open, scannerStarted, onScan]);

  return (
    <div className={classNames('QrCodeScanner', { additional: [className] })}>
      <IconButton onClick={startScan}>
        <QrCode />
      </IconButton>

      {/* Модальное окно с QR-сканером */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalDialog>
          <ModalClose />
          <Typography
            level="h4"
            mb={1}
          >
            {t('Сканируйте QR-код')}
          </Typography>
          <div
            id="qr-reader"
            ref={scannerRef}
          />
        </ModalDialog>
      </Modal>
    </div>
  );
};
