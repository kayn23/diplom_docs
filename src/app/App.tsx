import { classNames } from 'shared/lib/classNames/classNames';

import { AppRouter } from './providers';
import { Navbar } from 'widgets/Navbar';

import './config/i18n.ts';
import { Suspense } from 'react';

function App() {
  return (
    <>
      <Suspense fallback="">
        <div className={classNames('app')}>
          <Navbar />
          <AppRouter />
        </div>
      </Suspense>
    </>
  );
}

export default App;
