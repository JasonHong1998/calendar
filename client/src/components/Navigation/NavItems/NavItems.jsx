import React from 'react';
import styled from 'styled-components';
import NavItem from './NavItem/NavItem.jsx';

const StyledNav = styled.nav`
  display: flex;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: ${(props) => (props.mobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
`;

const NavItems = ({ mobile, clicked }) => (
  <StyledNav>
    <StyledUl mobile={mobile}>
      <NavItem clicked={clicked} mobile={mobile} link="/">HOME</NavItem>
      <NavItem clicked={clicked} mobile={mobile} link="/calendar">ABOUT</NavItem>
    </StyledUl>
  </StyledNav>
);

export default NavItems;
