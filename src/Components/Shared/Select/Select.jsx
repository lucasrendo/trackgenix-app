import React from "react";
import styles from './select.module.css'

const Select = ({text, id, value, required}) => {
    return (
        <div>
            <label className="">
                {text}
            </label>
            <select className="" id={id} value={value} required={required}>
            </select>
        </div>
    );
};

export default Select;
