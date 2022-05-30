import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import EmployeesList from './EmployeesList';
import Modal from '../Modal/Modal';

const Employees = () => {
  const [employeesList, saveEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
  const deleteEmployeeofList = (id) => {
    saveEmployees([...employeesList.filter((listItem) => listItem._id !== id)]);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteEmployeeofDB = () => {
    console.log('se borro');
  };

  return (
    <section className={styles.container}>
      <Modal show={showModal} close={closeModal} onCloseModal={deleteEmployeeofDB} />
      <h2>Employees</h2>
      <EmployeesList
        list={employeesList}
        setList={saveEmployees}
        deleteItem={deleteEmployeeofList}
        setShowModal={setShowModal}
      />
    </section>
  );
};

export default Employees;
