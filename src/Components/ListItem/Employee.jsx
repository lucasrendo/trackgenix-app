import React, { useState } from 'react';
import styles from './employee.module.css';
import Modal from '../Modal/Modal';

const Employee = ({ listItem, deleteItem, setShowModal }) => {
  const handleDelete = () => {
    setShowModal(true);
  };

  return (
    <tr className={styles.rows}>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>{listItem.isActive.toString()}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default Employee;
