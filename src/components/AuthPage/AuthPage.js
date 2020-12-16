import React, { useState } from 'react';
import { LoginForm, RegistrationForm } from '../AuthForm/AuthForm';
import { Redirect } from 'react-router-dom';
import s from './authPage.module.css';

const AuthPage = ({ isAuth, login, registration, isSending }) => {
  const [isLogin, setIsLogin] = useState(true);
  const title = isLogin ? 'Login' : 'Registration';
  const btnText = isLogin ? 'Registration' : 'Login';

  const toggleForm = () => {
    setIsLogin(!isLogin);
  }

  const onLogin = ({ email, password }) => {
    login(email, password);
  }

  const onRegistrationt = ({ email, password }) => {
    registration(email, password);
  }

  if (isAuth) {
    return <Redirect to='/library' />
  }

  return (
    <section className="wrapper">
      <div className="container">
        <h2 className="title">
          {title}
        </h2>
        {
          isLogin ?
            <LoginForm title={title} isLogin={isLogin} onSubmit={onLogin} isSending={isSending} /> :
            <RegistrationForm title={title} onSubmit={onRegistrationt} isSending={isSending} />
        }
        <button onClick={toggleForm} className={s['toggle-btn']}>
          {btnText}
        </button>
      </div>
    </section>
  )
}

export default AuthPage;
