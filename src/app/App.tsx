import { useTheme } from 'shared/config/theme/useTheme';
import { classNames } from 'shared/lib/classNames/classNames';

import { AppRouter } from './providers';
import './styles/index.scss';
import { Navbar } from 'widgets/Navbar';

import './config/i18n.ts';

function App() {
  const { theme } = useTheme();
  return (
    <>
      <div className={classNames('app', { additional: [theme] })}>
        <Navbar />
        <AppRouter />
      </div>
    </>
  );
}

export default App;
