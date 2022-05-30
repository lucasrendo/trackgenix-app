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
      console.log(error);
    }
  }, []);
  const addEmployee = ({ firstName, lastName, email }) => {
    const newEmployee = {
      firstName,
      lastName,
      email
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
// {employees.map((employee) => {
//   return <div key={employee.id}>{employee.name}</div>;
// })}
