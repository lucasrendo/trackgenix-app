import React, { useState, useEffect } from 'react';
import Form from '../Shared/Form/Form';
import List from '../SuperAdmins/List/superadmin-list';
import styles from './super-admins.module.css';

function SuperAdmins(props) {
  const [superadminsList, saveSuperadmins] = useState([]);
  const [showedScreen, setShowedScreen] = useState();
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admin`);
      const superAdmins = await response.json();
      saveSuperadmins(superAdmins.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  const deleteSuperadmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admin/${id}`, {
        method: 'DELETE'
      });
      // eslint-disable-next-line no-unused-vars
      const data = await response.json;
      alert(`Super admin with id ${id} is going to be deleted`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    saveSuperadmins([...superadminsList.filter((ListItem) => ListItem._id !== id)]);
  };

  const addItem = async ({ _id, firstName, lastName, email, password, isActive }) => {
    const newSuperAdmin = {
      _id,
      firstName,
      lastName,
      email,
      password,
      isActive
    };
    saveSuperadmins([...superadminsList, newSuperAdmin]);
  };

  const data = [
    {
      title: 'First Name',
      type: 'text',
      id: 'firstName',
      required: true
    },
    {
      title: 'Last Name',
      type: 'text',
      id: 'lastName',
      required: true
    },
    {
      title: 'Email',
      type: 'email',
      id: 'email',
      required: true
    },
    {
      title: 'Password',
      type: 'password',
      id: 'password',
      required: true
    },
    {
      title: 'Is active',
      type: 'checkbox',
      id: 'isActive',
      required: false
    }
  ];

  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      {showedScreen ? (
        <Form data={data} props={props} />
      ) : (
        <List
          list={superadminsList}
          setList={saveSuperadmins}
          deleteItem={deleteSuperadmin}
          data={data}
        />
      )}
      <div>
        <button onClick={() => setShowedScreen(false)}>Timesheet list</button>
        <button onClick={() => setShowedScreen(true)}>Add new Timesheet</button>
      </div>
    </section>
  );
}

export default SuperAdmins;
