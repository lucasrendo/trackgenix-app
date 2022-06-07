import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import List from '../Shared/List/List';
import Form from './Form/index';
import Button from '../Shared/Button/Button';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [screen, changeScreen] = useState(false);
  const [method, setMethod] = useState('POST');
  const [adminId, setAdminId] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response.data);
      });
  }, []);

  const formatListData = (responseData) => {
    const data = responseData.map((admin) => {
      return {
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        isActive: admin.isActive.toString()
      };
    });
    return data;
  };

  const headers = [
    { header: 'First name', key: 'firstName' },
    { header: 'Last name', key: 'lastName' },
    { header: 'Email', key: 'email' },
    { header: 'is Active?', key: 'isActive' }
  ];

  const resource = 'admins';

  const createAdmin = (adm) => {
    const newAdmin = { ...adm };
    setAdmins([...admins, newAdmin]);
  };

  const editAdmin = (id) => {
    setMethod('PUT');
    changeScreen(true);
    setAdminId(id);
  };

  const deleteAdmin = (_id) => {
    setAdmins([...admins.filter((admin) => admin._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <div>
        <Button onClick={() => changeScreen(false)}>Admin List</Button>
        <Button onClick={() => changeScreen(true)}>Save Admin</Button>
      </div>
      {screen ? (
        <Form
          onAdd={createAdmin}
          method={method}
          setMethod={setMethod}
          adminId={adminId}
          editAdmin={editAdmin}
        />
      ) : (
        <List
          data={formatListData(admins)}
          headers={headers}
          resource={resource}
          deleteAdmin={deleteAdmin}
          editAdmin={editAdmin}
          method={method}
        />
      )}
      ;
    </section>
  );
};

export default Admins;
