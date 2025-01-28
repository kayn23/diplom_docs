import { classNames } from 'shared/lib/classNames/classNames';

import { AppRouter } from './providers';
import { Navbar } from 'widgets/Navbar';

import './config/i18n.ts';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User/index.ts';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

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
