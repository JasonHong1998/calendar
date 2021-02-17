import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 2rem;
  flex-direction: column;
  &:last-of-type {
    margin-bottom: 3rem;
  }
`;

const StyledInput = styled.input`
  padding: 1.2rem 2rem;
  width: 100%;
  background-color: #f1f1f1;
  color: #000;
  font-weight: 500;
  font-size: 1.2rem;
  border-radius: 1rem;
  border: none;
  &::placeholder {
    color: #979797;
  }
`;

const Error = styled.div`
  color: var(--color-errorRed);
  visibility: ${({ show }) => (show ? 'visibile' : 'hidden')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transform: translateY(${({ show }) => (show ? '20px' : '10px')});
  transition: all 0.1s;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0rem 2rem;
  font-weight: 500;
  font-size: 1.2rem;
`;

const Input = ({ field, form: { touched, errors }, ...props }) => (
  <InputWrapper>
    <StyledInput {...field} {...props} />
    <Error show={errors[field.name] && touched[field.name]}>
      {errors[field.name]}
    </Error>
  </InputWrapper>
);

export default Input;
