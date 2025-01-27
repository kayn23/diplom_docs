import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import App from 'app/App.tsx';
import { ReduxProvider } from 'app/providers/ReduxProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
