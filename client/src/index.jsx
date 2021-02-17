import ReactDOM from 'react-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import GlobalStyles from './utils/global.js';
import store from './store/index.js';
import theme from './utils/theme.js';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
        <GlobalStyles />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
