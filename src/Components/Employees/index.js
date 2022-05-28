import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import EmployeesList from './EmployeesList';

const Employees = () => {
  const [employeesList, saveEmployees] = useState([]);
  console.log(employeesList);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const jsonResponse = await response.json();
      saveEmployees(jsonResponse.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  //Delete employee
  const deleteEmployee = (id) => {
    saveEmployees([...employeesList.filter((listItem) => listItem._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <EmployeesList list={employeesList} setList={saveEmployees} deleteItem={deleteEmployee} />
    </section>
  );
};

export default Employees;
