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

const NavItems = ({ mobile, clicked, loggedIn }) => {
  let links;
  if (loggedIn) {
    links = (
      <StyledUl mobile={mobile}>
        <NavItem clicked={clicked} mobile={mobile} link="/">HOME</NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/calendar">CALENDAR</NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/signout">SIGN OUT</NavItem>
      </StyledUl>
    );
  } else {
    links = (
      <StyledUl mobile={mobile}>
        <NavItem clicked={clicked} mobile={mobile} link="/">HOME</NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/calendar">CALENDAR</NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/signin">SIGN IN</NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/signup">SIGN UP</NavItem>
      </StyledUl>
    );
  }

  return (
    <StyledNav>{links}</StyledNav>
  );
};

export default NavItems;
