import React, { useState } from 'react';
import Styles from './addsuperadmin.module.css';

const AddItem = ({ addItem }) => {
  const [superAdminInput, setSuperAdmin] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
        'Content-type': 'aplication/json'
      },
      body: JSON.stringify({
        firstName: superAdminInput.firstName,
        lastName: superAdminInput.lastName,
        email: superAdminInput.email,
        isActive: superAdminInput.isActive
      })
    };
    const url = `http://localhost:4000/super-admins/`;

    fetch(url, postSuperAdmin)
      .then((response) => response.json())
      // eslint-disable-next-line no-console
      .then((data) => console.log('data:', data));

    addItem(superAdminInput);
    setSuperAdmin({
      firstName: '',
      lastName: '',
      email: '',
      isActive: ''
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
