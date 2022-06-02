import React, { useState } from 'react';
import styles from './EmployeesForm.module.css';

const EditEmployee = () => {
  const [employeeInput, setEmployeeInput] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [isActiveInput, setIsActiveInput] = useState({
    isActive: false
  });

  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };

  const onChangeBoolean = (e) => {
    setIsActiveInput({ ...isActiveInput, [e.target.name]: e.currentTarget.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const putEmployee = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: employeeInput.firstName,
        lastName: employeeInput.lastName,
        email: employeeInput.email,
        password: employeeInput.password,
        isActive: isActiveInput.isActive
      })
    };
    const params = new URLSearchParams(window.location.search);
    const employeeId = params.get('id');
    const url = `${process.env.REACT_APP_API_URL}/employees/${employeeId}`;

    fetch(url, putEmployee)
      .then((response) => response.json())
      // eslint-disable-next-line no-console
      .then((data) => console.log('data:', data));

    setEmployeeInput({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Edit employee</h2>
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
            value={isActiveInput.isActive}
            onChange={onChangeBoolean}
          />
        </div>
        <input type="submit" value="Edit Employee" />
      </form>
    </div>
  );
};

export default EditEmployee;
