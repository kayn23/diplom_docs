import React from 'react';
import type { Preview } from '@storybook/react';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '../src/app/providers/ThemeProvider';
import './storybook.scss';
import '../src/app/styles/index.scss';

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
    (Story, context) => {
      const currentTheme = context.globals.theme || 'light';
      // const backgroundColor = currentTheme === 'light' ? 'var(--nord6)' : 'var(--nord0)';

      return (
        <ThemeProvider>
          <BrowserRouter>
            <div
              className={`app ${currentTheme}`}
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
          </BrowserRouter>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
