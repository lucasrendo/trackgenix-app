import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from '../SuperAdmins/List/superadmin-list';
import Button from '../Shared/Button/Button';
import styles from './super-admins.module.css';

function SuperAdmins() {
  const [superadminsList, saveSuperadmins] = useState([]);
  const resource = '/super-admin';
  useEffect(async () => {
    getSuperAdmins();
  }, []);

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admin`);
      const body = await response.json();
      saveSuperadmins(body.data);
    } catch (error) {
      alert(error);
    }
  };

  const deleteSuperadmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admin/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json;
      alert(`Super admin with id ${id} is going to be deleted`);
    } catch (error) {
      console.error(error);
    }
    saveSuperadmins([...superadminsList.filter((ListItem) => ListItem._id !== id)]);
  };

  const config = [
    {
      header: 'First Name',
      type: 'text',
      key: 'firstName',
      required: true
    },
    {
      header: 'Last Name',
      type: 'text',
      key: 'lastName',
      required: true
    },
    {
      header: 'Email',
      type: 'email',
      key: 'email',
      required: true
    },
    {
      header: 'Password',
      type: 'password',
      key: 'password',
      required: true
    },
    {
      header: 'Is active',
      type: 'checkbox',
      key: 'isActive',
      required: false
    }
  ];

  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <div>
        <Link
          to={{
            pathname: '/super-admin/form',
            linkData: config,
            itemData: '',
            DBPath: resource
          }}
          className={styles.create}
        >
          <Button classes="block">Create Super Admin</Button>
        </Link>
      </div>
      <List
        list={superadminsList}
        setList={saveSuperadmins}
        deleteItem={deleteSuperadmin}
        data={config}
      />
    </section>
  );
}

export default SuperAdmins;
