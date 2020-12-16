import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/FormContols/FormControls';
import { required, authorsPattern, bookPattern, dateNotFuture, onlyNumbers, ISBNDateControl } from '../../utils/validators';
import s from './bookForm.module.css'

const BookForm = ({ title, handleSubmit, error, isSending }) => {
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <Field type="text" name={'title'} label="Title:" id="title" placeholder="Title" component={Input} validate={[required, bookPattern]} autoComplete="on" />
      <Field type="text" name={'authors'} label="Authors:" id="Authors" placeholder="Authors" component={Input} validate={[required, authorsPattern]} autoComplete="on" />
      <Field type="date" name={'date'} label="Date:" id="Date" placeholder="Date" component={Input} validate={[required, dateNotFuture]} autoComplete="on" />
      <Field type="text" name={'ISBN'} label="ISBN:" id="ISBN" placeholder="ISBN" component={Input} validate={[required, onlyNumbers, ISBNDateControl]} autoComplete="on" />
      {
        error &&
        <p className="alert alert-danger">
          {error}
        </p>
      }
      <button type="submit" className={`btn btn-primary ${s['submit-btn']}`} disabled={isSending}>
        {title}
      </button>
    </form>
  )
}

export default reduxForm({
  form: 'book',
})(BookForm);
