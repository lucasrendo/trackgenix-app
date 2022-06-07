import React, { useState, useEffect } from 'react';
import List from '../Shared/List/List';
import Form from '../Shared/Form/Form';
import Button from '../Shared/Button/Button';
import styles from '../Shared/List/list.module.css';

function SuperAdmins(props) {
  const [superAdminsList, setSuperAdmins] = useState([]);
  const [showedScreen, setShowedScreen] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admin`)
      .then((response) => response.json())
      .then((superAdmins) => {
        setSuperAdmins(superAdmins.data);
      });
  }, []);

  const formatListData = (responseData) => {
    const data = responseData.map((superAdmins) => {
      return {
        firstName: superAdmins.firstName,
        lastName: superAdmins.lastName,
        email: superAdmins.email,
        isActive: superAdmins.isActive.toString()
      };
    });
    return data;
  };
  const headers = [
    { header: 'First Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'email', key: 'email' },
    { header: 'Is Active?', key: 'isActive' }
  ];
  const resource = 'super-admins';

  const deleteSuperAdmin = (id) => {
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/super-admin/${id}`, {
        method: 'DELETE'
      });
      // eslint-disable-next-line no-unused-vars
      const data = response.json;
      alert(`Super admin with id ${id} is going to be deleted`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setSuperAdmins([...superAdminsList.filter((ListItem) => ListItem._id !== id)]);
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
      <div>
        <Button onClick={() => setShowedScreen(false)}>Super Admin List</Button>
        <Button onClick={() => setShowedScreen(true)}>Add new Super Admin</Button>
      </div>
      {showedScreen ? (
        <Form data={data} props={props} />
      ) : (
        <div>
          <List
            data={formatListData(superAdminsList)}
            headers={headers}
            resource={resource}
            deleteItem={deleteSuperAdmin}
          />
        </div>
      )}
    </section>
  );
}

export default SuperAdmins;
