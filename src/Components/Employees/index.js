import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import AddEmployee from './AddItem/AddItem';

function Employees() {
  const [employees, setEmployee] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployee(data.data);
    } catch (error) {
      error;
    }
  }, []);

  const addEmployee = ({ firstName, lastName, email, password }) => {
    const newEmployee = {
      id: Math.floor(Math.random() * 1000),
      firstName,
      lastName,
      email,
      password
    };
    setEmployee([...employees, newEmployee]);
  };

  return (
    <section className={styles.container}>
      <AddEmployee addEmployee={addEmployee} />
    </section>
  );
}

export default Employees;
