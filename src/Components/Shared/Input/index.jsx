import React from 'react';
import styles from './index.module.css';

const Input = ({ text, type, id, required, value, onChange, error, register }) => {
  return (
    <div className={type === 'checkbox' ? styles.check : styles.inputContainer}>
      <label>{text}</label>
      <input
        className={error ? styles.inputError : styles.inputOk}
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        {...register(id)}
      />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default Input;
