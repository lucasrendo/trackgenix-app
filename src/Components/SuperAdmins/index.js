import React, { useState, useEffect } from 'react';
import ListItem from '../SuperAdmins/List/superadmin-list';
import styles from './super-admins.module.css';

function SuperAdmins() {
  const [superadminsList, saveSuperadmins] = useState([]);
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

  const deleteSuperadmin = (id) => {
    saveSuperadmins([...superadminsList.filter((ListItem) => ListItem._id !== id)]);
    alert(`Super admin with ID: "${id}" is going to be deleted`);
  };

  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <div>
        <ListItem list={superadminsList} setList={saveSuperadmins} deleteItem={deleteSuperadmin} />
      </div>
    </section>
  );
}

export default SuperAdmins;
