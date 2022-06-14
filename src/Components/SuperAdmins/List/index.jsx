import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from '../../Shared/List/List';
import Button from '../../Shared/Button/Button';
import Loading from '../../Shared/Loading/Loading';
import styles from './super-admins.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins } from '../../../redux/super admins/thunks';

function SuperAdmins() {
  const dispatch = useDispatch();

  const superAdmins = useSelector((state) => state.superAdmins.list);
  const isLoading = useSelector((state) => state.superAdmins.isLoading);

  const [superadminsList, saveSuperadmins] = useState([]);
  const serverPath = '/super-admins';

  const headers = [
    { header: 'First name', key: 'firstName' },
    { header: 'Last name', key: 'lastName' },
    { header: 'Email', key: 'email' },
    { header: 'is Active?', key: 'isActive' }
  ];

  useEffect(async () => {
    dispatch(getSuperAdmins());
  }, []);

  const deleteSuperAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/super-admin/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    alert(`Super admin with id ${id} is going to be deleted`);
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
        fullList={superAdmins}
        data={formatListData(superAdmins)}
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
