import { compose } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { getIsAuth, getEmail } from '../../redux/selectors';
import Header from './Header';

const mapStateToProps = (state) => {
  return {
    isAuth: getIsAuth(state),
    email: getEmail(state),
  }
}

const mapDispatchToProps = {
  logout,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Header);