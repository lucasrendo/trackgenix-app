import React, { useState } from 'react';
// import Form from '../Form/EmployeesForm';
import styles from './AddItem.module.css';

const AddEmployee = ({ addEmployee }) => {
  const [employeeInput, setEmployeeInput] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.firstName]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEmployee(employeeInput);
    setEmployeeInput({
      firstName: '',
      lastName: '',
      email: ''
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Add new employee</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Insert Employee Name"
            value={employeeInput.firstName}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Insert Employee Last Name"
            value={employeeInput.lastName}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="Insert Employee Email"
            value={employeeInput.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Insert Password" />
        </div>
        <div>
          <label>Assigned Projects</label>
          <input type="text" placeholder="Insert Employee Assigned Projects" />
        </div>
        <input type="submit" value="Add Employee" />
      </form>
    </div>
  );
};

export default AddEmployee;
