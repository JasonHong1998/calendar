import ReactDOM from 'react-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import GlobalStyles from './utils/global.js';
import theme from './utils/theme.js';

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyles />
    </ThemeProvider>
  </Router>,
  document.getElementById('app'),
);
