import { ReactNode, useCallback, useEffect, type FC } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Button } from 'shared/ui/Button/ui/Button';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  header?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ header, isOpen, onClose, children }) => {
  const mods: Mods = {
    [cls.opened]: isOpen,
  };

  const onCloseHandle = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const onConteinerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseHandle();
      }
    },
    [onCloseHandle]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return (
    <>
      {createPortal(
        <div className={classNames(cls.Modal, { mods })}>
          <div className={classNames(cls.overlay)}
onClick={onCloseHandle}>
            <div className={classNames(cls.container)}
onClick={onConteinerClick}>
              {header ? <div className={cls.header}>{header}</div> : <div style={{ marginBottom: '2rem' }}></div>}
              <Button theme="clear"
className={cls.closeButton}
onClick={onCloseHandle}>
                X
              </Button>
              {children}
            </div>
          </div>
        </div>,
        document.querySelector('#root')!
      )}
    </>
  );
};
