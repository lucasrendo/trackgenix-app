import React from 'react';
import styles from './input.module.css';

const Input = ({ text, type, id, required, value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.labelInput}>{text}</label>
      <input
        className={styles.inputBox}
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
