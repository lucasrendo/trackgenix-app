import React from "react";
import styles from './select.module.css'

const Select = ({text, id, value, required}) => {
    return (
        <div className={styles.selectContainer}>
            <label className={styles.labelSelect}>
                {text}
            </label>
            <select className={styles.selectBox} id={id} value={value} required={required}>
            </select>
        </div>
    );
};

export default Select;