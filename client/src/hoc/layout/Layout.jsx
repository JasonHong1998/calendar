import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navigation/NavBar/NavBar.jsx';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer.jsx';

const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
`;

const Layout = ({ children }) => (
  <>
    <Navbar />
    <SideDrawer />
    <MainContainer>{children}</MainContainer>
  </>
);

export default Layout;
