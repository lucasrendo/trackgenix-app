import { useEffect, useState } from 'react';
import styles from './Form/EmployeesForm.module.css';

function Employees() {
  const [employees, saveEmployees] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <div>
        {employees.map((employee) => {
          //return <div key={employee.id}>{employee.name}</div>;
          return (
            <a href="./Form" key={employee.id}>
              {employee.name}
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default Employees;
