import React from 'react';
import s from './booksItem.module.css';
import { NavLink } from "react-router-dom";

const BooksItem = ({ bookInfo, deleteBook, deletingInProgress }) => {
  return (
    <article className={s.wrapper}>
      <h2 className={s.title}>
        {bookInfo.title}
      </h2>
      <ul className={s.list}>
        <li className={s.item}>
          <span className={s.field}>
            Date of issue:
          </span>
          <span className={s.value}>
            {bookInfo.date}
          </span>
        </li>
        <li className={s.item}>
          <span className={s.field}>
            Authors:
          </span>
          <span className={s.value}>
            {bookInfo.authors}
          </span>
        </li>
        <li className={s.item}>
          <span className={s.field}>
            ISBN:
          </span>
          <span className={s.value}>
            {bookInfo.ISBN}
          </span>
        </li>
      </ul>
      <div className={s.controls}>
        <NavLink to={`/book/${bookInfo.ISBN}`} className={`btn btn-warning ${s.control}`}>
          Edit
        </NavLink>
        <button
          className={`btn btn-danger ${s.control}`}
          disabled={deletingInProgress.some(ISBN => ISBN === bookInfo.ISBN)}
          onClick={() => deleteBook(bookInfo.ISBN)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default BooksItem;