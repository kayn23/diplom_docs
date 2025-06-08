import type { FC } from 'react';
import cls from './QrCodeModal.module.scss';
import { Modal, ModalClose, ModalDialog } from '@mui/joy';

interface QrCodeModalProps {
  className?: string;
  setOpen: (value: boolean) => void;
  src: string;
}

export const QrCodeModal: FC<QrCodeModalProps> = (props) => {
  const { setOpen, src } = props;

  return (
    <Modal
      open
      onClose={() => setOpen(false)}
    >
      <ModalDialog>
        <ModalClose variant="solid" />
        <img
          src={src}
          className={cls.img}
        />
      </ModalDialog>
    </Modal>
  );
};
