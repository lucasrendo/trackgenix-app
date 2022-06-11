import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from '../Shared/List/List';
import Button from '../Shared/Button/Button';
import styles from '../Shared/List/list.module.css';
import Loading from '../Shared/Loading/Loading';

function SuperAdmins() {
  const [superAdminsList, setSuperAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);
  const serverPath = '/super-admin';
  const config = [
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

  const headers = [
    { header: 'First Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'email', key: 'email' },
    { header: 'Is Active?', key: 'isActive' }
  ];

  useEffect(() => {
    getSuperAdmin();
  }, []);

  const getSuperAdmin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${serverPath}`);
      const body = await response.json();
      setSuperAdmins(body.data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const formatListData = (responseData) => {
    const data = responseData.map((superAdmins) => {
      return {
        id: superAdmins._id,
        firstName: superAdmins.firstName,
        lastName: superAdmins.lastName,
        email: superAdmins.email,
        isActive: superAdmins.isActive.toString()
      };
    });
    return data;
  };

  const deleteSuperAdmin = (id) => {
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}${serverPath}/${id}`, {
        method: 'DELETE'
      });
      // eslint-disable-next-line no-unused-vars
      const data = response.json;
      alert(`Super admin with id ${id} is going to be deleted`);
    } catch (error) {
      // eslint-disable-next-line no-console
      alert(error);
    }
    setSuperAdmins([...superAdminsList.filter((ListItem) => ListItem._id !== id)]);
  };

  return isLoading ? (
    <>
      <h2>Super Admins</h2>
      <Loading />
    </>
  ) : (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      <div>
        <Link
          to={{
            pathname: '/super-admins/form',
            linkData: config,
            DBPath: serverPath
          }}
          className={styles.linkReset}
        >
          <Button classes="block">Create new Employee</Button>
        </Link>
      </div>
      <List
        data={formatListData(superAdminsList)}
        headers={headers}
        resource={serverPath}
        deleteItem={deleteSuperAdmin}
        linkData={config}
      />
    </section>
  );
}

export default SuperAdmins;
