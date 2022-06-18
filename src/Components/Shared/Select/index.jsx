import React from 'react';
import styles from './index.module.css';

const Select = ({ text, id, value, required, onChange, item, type, error, register }) => {
  return (
    <div className={styles.inputContainer}>
      <label>{text}</label>
      <select
        className={error ? styles.inputError : styles.inputOk}
        id={id}
        value={value}
        required={required}
        onChange={onChange}
        type={type}
        {...register(id)}
      >
        <option selected disabled value="">{`select ${item.title}`}</option>
        {item.options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.text}
          </option>
        ))}
      </select>
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default Select;
