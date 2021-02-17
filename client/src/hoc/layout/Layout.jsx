import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Navbar from '../../components/Navigation/NavBar/NavBar.jsx';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer.jsx';

const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-mainLight);
`;

const Layout = ({ children, loggedIn }) => (
  <>
    <Navbar loggedIn={loggedIn} />
    <SideDrawer loggedIn={loggedIn} />
    <MainContainer>{children}</MainContainer>
  </>
);

const mapStateToProps = ({ auth }) => ({
  loggedIn: auth.error === false ? true : null,
});

export default connect(mapStateToProps)(Layout);
