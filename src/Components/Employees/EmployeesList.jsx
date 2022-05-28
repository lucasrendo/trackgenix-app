import React from 'react';
import Employee from '../ListItem/Employee';
//import styles from './EmployeeList.module.css';

const EmployeeList = ({ list, deleteItem }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th id="firstName">First Name</th>
            <th id="lastName">Last Name</th>
            <th id="email">Email</th>
            <th id="isActive">Active</th>
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

export default EmployeeList;
