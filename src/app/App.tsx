import { useTheme } from 'shared/config/theme/useTheme';
import { classNames } from 'shared/lib/classNames/classNames';

import { AppRouter } from './providers';
import './styles/index.sass';

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className={classNames('app', { additional: [theme] })}>
        <button onClick={toggleTheme}>Toggle theme</button>
        <AppRouter />
      </div>
    </>
  );
}

export default App;
