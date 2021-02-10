import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  padding: 1rem;
  color: var(--color-white);
  font-size: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Logo = () => <LogoWrapper>Hoon</LogoWrapper>;

export default Logo;
