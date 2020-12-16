import React from 'react';
import s from './libraryPage.module.css';
import { NavLink } from "react-router-dom";
import BooksList from '../BooksList/BooksList';
import { Loader } from '../common/Loader/Loader';

const LibraryPage = ({ books, isFetching, deleteBook, deletingInProgress }) => {
  return (
    <section className="wrapper">
      <div className="container">
        <h1 className="title">
          Library
        </h1>
        <NavLink to="/book" className={`btn ${s['add-btn']}`}>
          Add new book
        </NavLink>
        {
          isFetching ?
            <Loader /> :
            <>
              {
                books.size > 0 ?
                  <BooksList books={books} deleteBook={deleteBook} deletingInProgress={deletingInProgress} /> :
                  <p className={`alert alert-warning ${s.alert}`}>
                    There are no books yet
                  </p>
              }
            </>
        }
      </div>
    </section >
  )
}

export default LibraryPage;
