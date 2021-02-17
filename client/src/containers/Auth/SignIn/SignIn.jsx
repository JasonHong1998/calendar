import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { FormWrapper, StyledForm, MessageWrapper } from '../../../hoc/layout/elements/index.jsx';
import Input from '../../../components/UI/Forms/Input/Input.jsx';
import Button from '../../../components/UI/Forms/Button/Button.jsx';
import Heading from '../../../components/UI/Headings/Heading.jsx';
import Message from '../../../components/UI/Message/Message.jsx';
import * as actions from '../../../store/actions/index.js';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
  password: Yup.string().required('The password is required.'),
});

const SignIn = ({
  login, loading, error, cleanUp,
}) => {
  useEffect(() => () => {
    cleanUp;
  }, [cleanUp]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SignInSchema}
      onSubmit={(values, { setSubmitting }) => {
        login(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size="h1" color="white">
            Sign In
          </Heading>
          <Heading size="h2" color="white">
            Welcome back!
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
              autocomplete="current-password"
              component={Input}
            />
            <Button disabled={!isValid || isSubmitting} type="submit" loading={loading ? 'Signing in...' : null}>
              Sign In
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

const mapDispatchToProps = {
  login: actions.signIn,
  cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
