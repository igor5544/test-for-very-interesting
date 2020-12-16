import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { getInitialized } from './redux/selectors';
import App from './App';
import { Loader } from './components/common/Loader/Loader';

class AppApiComponent extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    return (
      this.props.initialized ?
        <App /> :
        <Loader />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: getInitialized(state),
  }
}

const mapDispatchToProps = {
  initializeApp
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AppApiComponent);