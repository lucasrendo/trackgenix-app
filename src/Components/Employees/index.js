import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import AddEmployee from './AddItem/AddEmployee';

function Employees() {
  const [employees, setEmployee] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}employees`);
      const data = await response.json();
      setEmployee(data.data);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }, []);

  const addEmployees = ({ firstName, lastName, email, password, isActive }) => {
    const newEmployee = {
      id: Math.floor(Math.random() * 1000),
      firstName,
      lastName,
      email,
      password,
      isActive
    };
    setEmployee([...employees, newEmployee]);
  };
  // const url = `${process.env.REACT_APP_API_URL}employees?id=${listItem._id}`;
  return (
    <section className={styles.container}>
      <div>
        <AddEmployee addEmployee={addEmployees} />
        <button>{/* <a href={url}>Edit</a> */}</button>
      </div>
    </section>
  );
}

export default Employees;
