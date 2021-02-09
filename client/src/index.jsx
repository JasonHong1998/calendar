import ReactDOM from 'react-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import GlobalStyles from './utils/global.js';
import theme from './utils/theme.js';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyles />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('app'),
);
