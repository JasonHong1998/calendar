import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/layout/Layout.jsx';
import Home from './containers/Home/Home.jsx';
import Calendar from './containers/Calendar/Calendar.jsx';

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/calendar" component={Calendar} />
      <Redirect to="/" />
    </Switch>
  </Layout>
);

export default App;
