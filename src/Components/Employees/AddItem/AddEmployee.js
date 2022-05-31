import React, { useState } from 'react';
import styles from './AddEmployee.module.css';

const AddEmployee = ({ addEmployee }) => {
  const [employeeInput, setEmployeeInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isActive: false
  });

  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const postEmployee = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: employeeInput.firstName,
        lastName: employeeInput.lastName,
        email: employeeInput.email,
        password: employeeInput.password,
        isActive: employeeInput.isActive
      })
    };

    const url = `${process.env.REACT_APP_API_URL}employees`;
    fetch(url, postEmployee)
      .then((response) => response.json())
      .then(() => alert('New employee created'));

    addEmployee(employeeInput);
    setEmployeeInput({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isActive: false
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
            name="firstName"
            value={employeeInput.firstName}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={employeeInput.lastName}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={employeeInput.email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={employeeInput.password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Is Active?</label>
          <input
            type="checkbox"
            name="isActive"
            value={employeeInput.isActive}
            onChange={onchange}
            required
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddEmployee;
