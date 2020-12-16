import React from 'react';
import s from './header.module.css';

const Header = ({ isAuth, email, logout }) => {
  return (
    <header className={s.header}>
      <div className={`container ${s.wrapper}`}>
        {
          isAuth &&
          <>
            <p className={s.email}>
              {email}
            </p>
            <button className={s.btn} onClick={logout}>
              logout
            </button>
          </>
        }

      </div>
    </header>
  )
}

export default Header;