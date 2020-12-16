import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/FormContols/FormControls';
import { required, minLengthCreator, passwordsMatch, passwordPattern, emailPattern } from '../../utils/validators';
import s from './authForm.module.css';

const minLength9 = minLengthCreator(9);

const AuthForm = ({ title, isLogin = false, handleSubmit, error, isSending }) => {
  const passwordValidators = isLogin ? [required] : [required, passwordPattern, minLength9];
  const loginValidators = isLogin ? [required] : [required, emailPattern];

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Field type="email" name={'email'} placeholder="Email" component={Input} validate={loginValidators} autoComplete="on" />
      <Field type="password" name={'password'} placeholder="Password" component={Input} validate={passwordValidators} autoComplete="off" />
      { !isLogin &&
        <Field type="password" name={'Repeat-password'} placeholder="Repeat password" component={Input} validate={[required, passwordsMatch]} autoComplete="off" />
      }
      {
        error &&
        <p className="alert alert-danger">
          {error}
        </p>
      }
      <button type="submit" className={`btn btn-primary ${s['submit-btn']}`} disabled={isSending}>
        {title}
      </button>
    </form>
  )
}

export const LoginForm = reduxForm({
  form: 'login',
})(AuthForm);

export const RegistrationForm = reduxForm({
  form: 'registration'
})(AuthForm);