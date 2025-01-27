import { classNames } from 'shared/lib/classNames/classNames';

import { AppRouter } from './providers';
import { Navbar } from 'widgets/Navbar';

import './config/i18n.ts';
import { Suspense, useState } from 'react';
import { Button } from 'shared/ui/Button/ui/Button.tsx';
import { Modal } from 'shared/ui/Modal/index.ts';
import { Counter } from 'entities/Counter/index.ts';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Suspense fallback="">
        <div className={classNames('app')}>
          <Navbar />
          <AppRouter />
          <Button onClick={() => setIsOpen(true)}>openModal</Button>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Counter></Counter>
          </Modal>
        </div>
      </Suspense>
    </>
  );
}

export default App;
