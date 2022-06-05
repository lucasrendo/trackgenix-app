import React from "react";
import styles from './input.module.css'

const Input = ({text, type, id, required, value}) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.labelInput}>
                {text}
            </label>
            <input className={styles.inputBox} type={type} id={id} required={required} value={value}>
            </input>
        </div>
    );
};

export default Input;

