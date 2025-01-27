import { useTheme } from 'shared/config/theme/useTheme';
import { classNames } from 'shared/lib/classNames/classNames';

import { AppRouter } from './providers';
import './styles/index.scss';
import { Navbar } from 'widgets/Navbar';

import './config/i18n.ts';
import { Suspense, useState } from 'react';
import { Button } from 'shared/ui/Button/ui/Button.tsx';
import { Modal } from 'shared/ui/Modal/index.ts';
import { Counter } from 'entities/Counter/index.ts';

function App() {
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Suspense fallback="">
        <div className={classNames('app', { additional: [theme] })}>
          <Navbar />
          <AppRouter />
          <Button onClick={() => setIsOpen(true)}></Button>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Counter></Counter>
          </Modal>
        </div>
      </Suspense>
    </>
  );
}

export default App;
