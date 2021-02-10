import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledLi = styled.li`
  display: flex;
  height: 100%;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  border-bottom: 2px solid transparent;
  font-size: 1.2rem;
  padding: ${(props) => (props.mobile ? '0.5rem 1rem' : '1rem')};
  margin: ${(props) => (props.mobile ? '1rem 0' : '0 1rem')};
  font-weight: 400;
  color: var(--color-white);
  transition: all 0.2s;

  &:hover {
    border-bottom: ${(props) => (props.mobile ? '1px solid var(--color-white)' : '2px solid var(--color-white)')};
  }

  &.active {
    border-bottom: ${(props) => (props.mobile ? '1px solid var(--color-white)' : '2px solid var(--color-white)')};
  }
`;

const NavItem = ({ children, mobile, link, clicked }) => (
  <StyledLi>
    <StyledNavLink onClick={clicked} exact activeClassName="active" mobile={mobile} to={link}>{children}</StyledNavLink>
  </StyledLi>
);

export default NavItem;
