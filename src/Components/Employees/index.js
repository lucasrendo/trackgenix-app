import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import AddEmployee from './AddItem/AddEmployee';
import EmployeesList from './EmployeesList';
import listItem from '../ListItem/Employee';
import Modal from '../Modal/Modal';

const Employees = () => {
  const [employeesList, saveEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}employees`);
      const jsonResponse = await response.json();
      saveEmployees(jsonResponse.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };
  const addEmployees = ({ firstName, lastName, email, password, isActive }) => {
    const newEmployee = {
      id: Math.floor(Math.random() * 1000),
      firstName,
      lastName,
      email,
      password,
      isActive
    };
    saveEmployees([...employeesList, newEmployee]);
  };
  const url = `${process.env.REACT_APP_API_URL}employees?id=${listItem._id}`;

  //Delete employee
  const deleteEmployee = (id) => {
    saveEmployees([...employeesList.filter((listItem) => listItem._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <AddEmployee addEmployee={addEmployees} />
      <button>
        <a href={url}>Edit</a>
      </button>
      <Modal title={'Employee successfully deleted'} show={showModal} close={closeModal} />
      <h2>Employees</h2>
      <EmployeesList
        list={employeesList}
        setList={saveEmployees}
        deleteItem={deleteEmployee}
        setShowModal={setShowModal}
      />
    </section>
  );
};

export default Employees;
