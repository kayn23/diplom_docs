import { classNames } from 'shared/lib/classNames/classNames';

import { AppRouter } from './providers';
import { Navbar } from 'widgets/Navbar';

import './config/i18n.ts';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User/index.ts';

import 'react18-json-view/src/style.css';
import { Stack } from '@mui/joy';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback="">
        <Stack className={classNames('app')}>
          <Navbar />
          <div className="content">
            <AppRouter />
          </div>
        </Stack>
      </Suspense>
    </>
  );
}

export default App;
