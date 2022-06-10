import React from 'react';
import styles from './index.module.css';

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
      />
    </div>
  );
};

export default Input;
