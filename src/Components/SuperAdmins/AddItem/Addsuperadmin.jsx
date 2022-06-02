import React, { useState } from 'react';
import Styles from './addsuperadmin.module.css';

const AddItem = ({ addItem }) => {
  const [superAdminInput, setSuperAdmin] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isActive: ''
  });

  const onChange = (e) => {
    setSuperAdmin({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const postSuperAdmin = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: superAdminInput.firstName,
        lastName: superAdminInput.lastName,
        email: superAdminInput.email,
        password: superAdminInput.password,
        isActive: superAdminInput.isActive
      })
    };

    fetch(`${process.env.REACT_APP_API_URL}/super-admin`, postSuperAdmin)
      .then((response) => response.json())
      .then((responseJson) => {
        addItem(responseJson.data);
        setSuperAdmin({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          isActive: ''
        });
        alert('New super admin created');
      });
  };

  return (
    <div className={Styles.container}>
      <div>
        <h2>Add a new super admin</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="string"
            name="firstName"
            value={superAdminInput.firstName}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="string"
            name="lastName"
            value={superAdminInput.lastName}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="string"
            name="email"
            value={superAdminInput.email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={superAdminInput.password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Is active?</label>
          <input
            type="string"
            name="isActive"
            value={superAdminInput.isActive}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddItem;
