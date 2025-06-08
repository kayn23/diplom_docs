import React from 'react';
import type { Preview } from '@storybook/react';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '../src/app/providers/ThemeProvider';
import './storybook.scss';
import '../src/app/styles/index.scss';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/app/config/i18n';
import { useTheme } from '../src/shared/config/theme/useTheme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      // values: [
      //   { name: 'light', value: 'var(--nord6)' },
      //   { name: 'dark-theme', value: 'var(--nord0)' },
      // ],
      disable: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'circlehollow',
        // Array of plain string values or MenuItem shape (see below)
        items: ['light', 'dark-theme'],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story) => {
      return (
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <BrowserRouter>
              <Story />
            </BrowserRouter>
          </ThemeProvider>
        </I18nextProvider>
      );
    },
    (Story, context) => {
      const { theme } = useTheme();

      return (
        <div
          className={`app ${theme} ${context.globals.theme}`}
          style={{
            padding: '1rem',
            minWidth: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: context.viewMode === 'docs' ? 'auto' : '100vh',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
