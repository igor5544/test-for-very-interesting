import React from 'react';
import BooksItem from '../BookItem/BookItem';

const BooksList = ({ books, deleteBook, deletingInProgress }) => {
  const booksItems = [];

  books.forEach(book => {
    booksItems.push(
      <BooksItem bookInfo={book.data()} key={book.id} deleteBook={deleteBook} deletingInProgress={deletingInProgress}/>
    )
  })

  return (
    <ul>
      {booksItems}
    </ul>
  )
}

export default BooksList;