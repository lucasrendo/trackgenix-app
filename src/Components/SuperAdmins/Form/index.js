import { useState } from 'react';
import styles from './superadminform.module.css';

function Form() {
  const [superAdminInput, setSuperAdmin] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isActive: false
  });

  const onChange = (e) => {
    setSuperAdmin({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const putSuperAdmin = {
      method: 'PUT',
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

    const params = new URLSearchParams(window.location.search);
    const superAdminId = params.get('id');

    fetch(`${process.env.REACT_APP_API_URL}/super-admin/${superAdminId}`, putSuperAdmin)
      .then((response) => response.json())
      // eslint-disable-next-line no-console
      .then((data) => console.log('data:', data));
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Form</h2>
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
            type="boolean"
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
      <div>
        <button>
          <a href="/super-admins">Save changes</a>
        </button>
      </div>
    </div>
  );
}

export default Form;
