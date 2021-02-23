import React from 'react';
import styled from 'styled-components';
import { Container } from '../../../hoc/layout/elements/index.jsx';
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
  z-index: 10;

  @media ${(props) => props.theme.mediaQueries.smallest} {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const NavBar = () => (
  <FixedWrapper>
    <Container>
      <ContentWrapper>
        <Logo />
        <NavItems />
      </ContentWrapper>
    </Container>
  </FixedWrapper>
);

export default NavBar;
