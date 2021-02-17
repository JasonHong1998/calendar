import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { FormWrapper, StyledForm, MessageWrapper } from '../../../hoc/layout/elements/index.jsx';
import Input from '../../../components/UI/Forms/Input/Input.jsx';
import Button from '../../../components/UI/Forms/Button/Button.jsx';
import Message from '../../../components/UI/Message/Message.jsx';
import Heading from '../../../components/UI/Headings/Heading.jsx';
import * as actions from '../../../store/actions/index.js';

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
  password: Yup.string()
    .required('The password is required.')
    .min(8, 'The password is too short!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password doesn\'t match')
    .required('Please confirm your password.'),
});

const SignUp = ({ signUp, loading, error }) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      confirmPassword: '',
    }}
    validationSchema={SignUpSchema}
    onSubmit={(values, { setSubmitting }) => {
      signUp(values);
      setSubmitting(false);
    }}
  >
    {({ isSubmitting, isValid }) => (
      <FormWrapper>
        <Heading noMargin size="h1" color="white">
          Sign Up
        </Heading>
        <Heading bold size="h4" color="white">
          Fill in the details to register your new account
        </Heading>
        <StyledForm>
          <Field
            type="email"
            name="email"
            placeholder="Email"
            component={Input}
          />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            autocomplete="new-password"
            component={Input}
          />
          <Field
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            autocomplete="new-password"
            component={Input}
          />
          <Button disabled={!isValid || isSubmitting} type="submit" loading={loading ? 'Signing up...' : null}>
            Sign up
          </Button>
          <MessageWrapper>
            <Message error show={error}>{error}</Message>
          </MessageWrapper>
        </StyledForm>
      </FormWrapper>
    )}
  </Formik>
);

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

const mapDispatchToProps = {
  signUp: actions.signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
