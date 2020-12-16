import React from 'react';
import BookForm from '../BookForm/BookForm';
import { Redirect, NavLink } from 'react-router-dom';
import { Loader } from '../common/Loader/Loader';

const BookPage = ({ addNewBook, updateBookInfo, bookInfo, isFetching, isSending, successSend, bookId }) => {
  const onAddNewBook = ({ title, authors, date, ISBN }) => {
    addNewBook(title, authors, date, ISBN);
  }

  const onUpdateBookInfo = ({ title, authors, date, ISBN }) => {
    updateBookInfo(title, authors, date, ISBN, bookId);
  }

  if (successSend) {
    return <Redirect to='/library' />
  }

  return (
    <section className="wrapper">
      <div className="container">
        <NavLink to="/library" className="link-back">
          Back to library
        </NavLink>
        <h2 className="title">
          Book
        </h2>
        {
          isFetching ?
            <Loader/> :
            <>
              {
                bookInfo ?
                  <BookForm title={'Save'} onSubmit={onUpdateBookInfo} initialValues={bookInfo} isSending={isSending} /> :
                  <BookForm title={'Add'} onSubmit={onAddNewBook} isSending={isSending} />
              }
            </>
        }
      </div>
    </section>
  )
}

export default BookPage;
