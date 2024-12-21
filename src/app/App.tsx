import { useTheme } from 'shared/config/theme/useTheme';
import { classNames } from 'shared/lib/classNames/classNames';

import { AppRouter } from './providers';
import './styles/index.sass';
import { Navbar } from 'widgets/NavBar';

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
