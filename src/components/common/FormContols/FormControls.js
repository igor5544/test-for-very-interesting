import React from 'react';
import s from './formsControls.module.css';

export const Input = ({ input, meta, label, ...restProps }) => {
  const hasError = meta.touched && meta.error;

  return <div className={s['field-wrapper']}>
    {label && <label htmlFor={restProps.id}>{label}</label>}
    <input {...input} {...restProps} className={`form-control ${s.control}`} ></input>
    {
      hasError && 
      <p className="alert alert-danger"> {meta.error} </p>
    }
  </div>
}