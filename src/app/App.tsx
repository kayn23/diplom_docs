import { Route, Routes } from 'react-router';
import { useTheme } from 'shared/config/theme/useTheme';
import { Suspense } from 'react';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { classNames } from 'shared/lib/classNames/classNames';

import './styles/index.sass';

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className={classNames('app', { additional: [theme] })}>
        <button onClick={toggleTheme}>Toggle theme</button>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={'/'} element={<MainPage />} />
            <Route path={'/about'} element={<AboutPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
