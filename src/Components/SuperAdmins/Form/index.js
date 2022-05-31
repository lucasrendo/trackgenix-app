import { useState } from 'react';
import Styles from './superadminform.module.css';

function Form() {
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
    const putSuperAdmin = {
      method: 'PUT',
      headers: {
        'Content-type': 'aplication/json'
      },
      body: JSON.stringify({
        firstName: superAdminInput.firstName,
        lastName: superAdminInput.lastName,
        email: superAdminInput.email,
        isActive: superAdminInput.isActive.toString()
      })
    };
    const url = `http://localhost:4000/super-admins/form`;

    fetch(url, putSuperAdmin)
      .then((response) => response.json())
      // eslint-disable-next-line no-console
      .then((data) => console.log('data:', data));
  };

  return (
    <div className={Styles.container}>
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
            optional
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="string"
            name="lastName"
            value={superAdminInput.lastName}
            onChange={onChange}
            optional
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="string"
            name="email"
            value={superAdminInput.email}
            onChange={onChange}
            optional
          />
        </div>
        <div>
          <label>Is active?</label>
          <input
            type="string"
            name="isActive"
            value={superAdminInput.isActive}
            onChange={onChange}
            optional
          />
        </div>
        <div>
          <input type="submit" value="Save changes" />
        </div>
      </form>
    </div>
  );
}

export default Form;
