import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from '../../Shared/List/List';
import Button from '../../Shared/Button/Button';
import Loading from '../../Shared/Loading/Loading';
import styles from './super-admins.module.css';

function SuperAdmins() {
  const [superadminsList, saveSuperadmins] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);
  const serverPath = '/super-admins';

  const headers = [
    { header: 'First name', key: 'firstName' },
    { header: 'Last name', key: 'lastName' },
    { header: 'Email', key: 'email' },
    { header: 'is Active?', key: 'isActive' }
  ];

  useEffect(async () => {
    getSuperAdmins();
  }, []);

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admin`);
      const body = await response.json();
      saveSuperadmins(body.data);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const deleteSuperAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/super-admin/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    saveSuperadmins([...superadminsList.filter((superAdmin) => superAdmin._id !== id)]);
  };

  const formatListData = (responseData) => {
    const data = responseData.map((superAdmin) => {
      return {
        id: superAdmin._id,
        firstName: superAdmin.firstName,
        lastName: superAdmin.lastName,
        email: superAdmin.email,
        isActive: superAdmin.isActive.toString()
      };
    });
    return data;
  };

  return isLoading ? (
    <>
      <h2> Super Admins</h2>
      <Loading />
    </>
  ) : (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      <List
        fullList={superadminsList}
        data={formatListData(superadminsList)}
        headers={headers}
        resource={serverPath}
        deleteItem={deleteSuperAdmin}
      />
      <div>
        <Link to={'/super-admins/form'} className={styles.linkReset}>
          <Button classes="block">Create Super Admin</Button>
        </Link>
      </div>
    </section>
  );
}

export default SuperAdmins;
