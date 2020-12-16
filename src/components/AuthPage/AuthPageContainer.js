import { compose } from 'redux';
import { connect } from 'react-redux';
import { login, registration } from '../../redux/auth-reducer';
import { getIsAuth, gerIsSendingAuth } from '../../redux/selectors';
import AuthPage from './AuthPage';

const mapStateToProps = (state) => {
  return {
    isAuth: getIsAuth(state),
    isSending: gerIsSendingAuth(state)
  }
}

const mapDispatchToProps = {
  login,
  registration
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthPage);