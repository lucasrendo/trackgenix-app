import React from 'react';
import styles from './index.module.css';

const Input = ({ text, type, id, error, register, value }) => {
  return (
    <div className={type === 'checkbox' ? styles.check : styles.inputContainer}>
      <label htmlFor={id}>{text}</label>
      <input
        type={type}
        name={id}
        {...register(id)}
        className={error && styles.inputError}
        value={value}
      />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default Input;
