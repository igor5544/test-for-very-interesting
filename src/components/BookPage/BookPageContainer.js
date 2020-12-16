import React from 'react';
import BookPage from "./BookPage";
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addNewBook, getBookInfo, setBook } from '../../redux/library-reducer';
import { getActiveBook, getIsFetching, getSuccessSend, getIsSendingBook } from '../../redux/selectors';

class BookPageAPIComponent extends React.Component {
  getActualBookData() {
    let ISBN = this.props.match.params.ISBN;
    this.props.getBookInfo(ISBN);
  }

  componentDidMount() {
    console.log(this.props.match.params.ISBN)
    this.getActualBookData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.ISBN !== prevProps.match.params.ISBN) {
      this.getActualBookData();
    }
  }

  render() {
    return (
      <BookPage
        addNewBook={this.props.addNewBook}
        updateBookInfo={this.props.setBook}
        bookInfo={this.props.bookInfo}
        isFetching={this.props.isFetching}
        isSending={this.props.isSending}
        successSend={this.props.successSend}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bookInfo: getActiveBook(state),
    isFetching: getIsFetching(state),
    isSending: getIsSendingBook(state),
    successSend: getSuccessSend(state),
  }
}

const mapDispatchToProps = {
  getBookInfo,
  addNewBook,
  setBook
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthRedirect
)(BookPageAPIComponent);