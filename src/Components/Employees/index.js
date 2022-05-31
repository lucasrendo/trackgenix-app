import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import AddEmployee from './AddItem/AddEmployee';

function Employees() {
  const [employees, setEmployee] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }, []);

  const addEmployees = ({ firstName, lastName, email, password, assignedProject }) => {
    const newEmployee = {
      id: Math.floor(Math.random() * 1000),
      firstName,
      lastName,
      email,
      password,
      assignedProject
    };
    setEmployee([...employees, newEmployee]);
  };

  return (
    <section className={styles.container}>
      <AddEmployee addEmployee={addEmployees} />
    </section>
  );
}

export default Employees;
