import React from 'react';
import styled from 'styled-components';

const StyledP = styled.p`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${({ error, success }) => {
    if (error) {
      return 'var(--color-errorRed)';
    }
    if (success) {
      return 'green';
    }
    return 'var(--color-main)';
  }};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transform: translateY(${({ show }) => (show ? '3rem' : '0rem')});
  transition: all 0.2s;
  text-align: center;
`;

const Message = ({ children, error, success, show }) => (
  <StyledP error={error} success={success} show={show}>{children}</StyledP>
);

export default Message;
