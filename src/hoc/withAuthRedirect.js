import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsAuth } from '../redux/selectors';

const mapStateToPropsRedirect = (state) => {
  return {
    isAuth: getIsAuth(state)
  }
}

export const withAuthRedirect = (Component) => {
  
  class RedirectComponent extends React.Component { 
    render() {
      if (!this.props.isAuth) {
        return <Redirect to={'/auth'} />
      }
      
      return <Component {...this.props} /> 
    }
  }

  return connect(mapStateToPropsRedirect)(RedirectComponent);
}
