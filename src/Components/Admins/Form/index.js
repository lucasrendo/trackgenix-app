import { useState } from 'react';
import styles from './Form.module.css';

const AddAdmin = ({ adminId, onAdd }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    let url = `${process.env.REACT_APP_API_URL}/admins/`;
    const create = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        isActive: isActive
      })
    };
    if (adminId) {
      create.method = 'PUT';
      url = `${process.env.REACT_APP_API_URL}/admins/${adminId}`;
    }
    try {
      const response = await fetch(url, create);
      const data = await response.json();
      // eslint-disable-next-line no-console
      console.log(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    onAdd({ firstName, lastName, email, password, isActive });

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Add Admin</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Is Active</label>
          <input
            type="checkbox"
            name="is active"
            value={isActive}
            onChange={(e) => setIsActive(e.currentTarget.checked)}
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
