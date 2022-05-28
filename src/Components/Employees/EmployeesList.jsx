import React from 'react';
import Employee from '../ListItem/Employee';
import styles from './EmployeesList.module.css';

const EmployeesList = ({ list, deleteItem }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th id="firstName">First Name</th>
            <th id="lastName">Last Name</th>
            <th id="email">Email</th>
            <th id="isActive">Active</th>
            <th id="delete">Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <Employee key={item._id} listItem={item} deleteItem={deleteItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesList;
