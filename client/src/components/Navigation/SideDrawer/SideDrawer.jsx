import React, { useState } from 'react';
import styled from 'styled-components';
import Hamburger from './Hamburger/Hamburger.jsx';
import Logo from '../../Logo/Logo.jsx';
import NavItems from '../NavItems/NavItems.jsx';

const FixedWrapper = styled.div`
  position: fixed;
  background-color: var(--color-main);
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: none;
  z-index: 10;

  @media ${(props) => props.theme.mediaQueries.smallest} {
    display: flex;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const Menu = styled.div`
  width: 100%;
  background-color: var(--color-main);
  height: 100vh;
  visibility: ${(props) => (props.opened ? 'visible' : 'hidden')};
  transform: translateY(${(props) => (props.opened ? '0%' : '-100%')});
  transition: all 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  position: fixed;
  margin-top: 6rem;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
  z-index: 10;

  @media ${(props) => props.theme.mediaQueries.smallest} {
    display: flex;
  }
`;

const SideDrawer = ({ loggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FixedWrapper>
        <ContentWrapper>
          <Logo />
          <Hamburger opened={isOpen} clicked={() => setIsOpen(!isOpen)} />
        </ContentWrapper>
      </FixedWrapper>
      <Menu opened={isOpen}>
        <NavItems mobile loggedIn={loggedIn} clicked={() => setIsOpen(false)} />
      </Menu>
    </>
  );
};

export default SideDrawer;
