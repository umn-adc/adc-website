import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'styles/themes/default';
import GlobalStyle from 'styles/global';
import App from './App';

const container = document.getElementById('app');
const root = container ? createRoot(container as HTMLElement) : null;

root?.render(
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
