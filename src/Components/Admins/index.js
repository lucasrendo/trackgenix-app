import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Admin from './Admin/Admin';

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response.data);
      });
  }, []);

  const deleteAdmin = (_id) => {
    setAdmins([...admins.filter((admin) => admin._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Admin list={admins} setList={setAdmins} deleteAdmin={deleteAdmin} />
    </section>
  );
};

export default Admins;
