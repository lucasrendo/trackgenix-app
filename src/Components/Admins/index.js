import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import List from './List/List';
import Form from './Form/index';

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
        <button onMouseDown={() => changeScreen(false)}>Admin List</button>
        <button onMouseDown={() => changeScreen(true)}>Save Admin</button>
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
        <List list={admins} setList={setAdmins} deleteAdmin={deleteAdmin} editAdmin={editAdmin} />
      )}
      ;
    </section>
  );
};

export default Admins;
