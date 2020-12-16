import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import LibraryPage from './LibraryPage';
import { getIsFetching, getBooksList, getDeletingInProgress } from '../../redux/selectors';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { toggleSubscribeBooks, deleteBook } from '../../redux/library-reducer';

class LibraryPageAPIComponent extends React.Component {
  componentDidMount() {
    this.props.toggleSubscribeBooks();
  }

  render() {
    return (
      <LibraryPage
        books={this.props.books}
        isFetching={this.props.isFetching}
        deleteBook={this.props.deleteBook}
        deletingInProgress={this.props.deletingInProgress}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: getIsFetching(state),
    books: getBooksList(state),
    deletingInProgress: getDeletingInProgress(state)
  }
}


const mapDispatchToProps = {
  toggleSubscribeBooks,
  deleteBook,
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps)
)(LibraryPageAPIComponent);