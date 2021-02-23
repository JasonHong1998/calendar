import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/layout/Layout.jsx';
import Home from './containers/Home/Home.jsx';
import Calendar from './containers/Calendar/Calendar.jsx';
import SignIn from './containers/Auth/SignIn/SignIn.jsx';
import SignUp from './containers/Auth/SignUp/SignUp.jsx';
import SignOut from './containers/Auth/SignOut/SignOut.jsx';

const App = ({ loggedIn }) => {
  let routes;
  if (loggedIn) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signout" component={SignOut} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Redirect to="/signin" />
      </Switch>
    );
  }
  return (
    <Layout>
      {routes}
    </Layout>
  );
};

const mapStateToProps = ({ auth }) => ({
  loggedIn: auth.error === false ? true : null,
});

export default connect(mapStateToProps)(App);
