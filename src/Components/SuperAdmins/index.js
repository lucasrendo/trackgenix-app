import { useState, useEffect } from 'react';
import editSuperAdmin from '../SuperAdmins/List/superadmin-list';
import List from '../Shared/List/List';
import styles from './super-admins.module.css';

function SuperAdmins() {
  const [superAdminsList, setSuperAdmins] = useState([]);

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
        id: superAdmins._id,
        firstName: superAdmins.firstName,
        lastName: superAdmins.lastName,
        email: superAdmins.email,
        isActive: superAdmins.isActive.toString()
      };
    });
    return data;
  };
  const headers = [
    { headers: 'Id', key: 'id' },
    { headers: 'First Name', key: 'firstName' },
    { headers: 'Last Name', key: 'lastName' },
    { headers: 'email', key: 'email' },
    { headers: 'Is Active?', key: 'isActive' }
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

  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <div>
        <List
          data={formatListData(superAdminsList)}
          headers={headers}
          resource={resource}
          deleteItem={deleteSuperAdmin}
          editItem={editSuperAdmin}
        />
      </div>
    </section>
  );
}

export default SuperAdmins;
