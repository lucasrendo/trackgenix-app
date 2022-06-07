import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import List from '../Shared/List/List';
import Button from '../Shared/Button/Button';
import Modal from '../Modal/Modal';

const Employees = () => {
  const [employeesList, setEmployeesList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const jsonResponse = await response.json();
      setEmployeesList(jsonResponse.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteEmployee = (id) => {
    setEmployeesList([...employeesList.filter((listItem) => listItem._id !== id)]);
  };

  const formatListData = (responseData) => {
    const data = responseData.map((employee) => {
      return {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        dni: employee.dni,
        email: employee.email,
        password: employee.password,
        dateOfBirth: employee.dateOfBirth,
        isActive: employee.isActive.toString()
      };
    });
    return data;
  };

  const headers = [
    { header: 'First Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Mail', key: 'email' },
    { header: 'Active', key: 'isActive' }
  ];

  const resource = 'employees';

  return (
    <section className={styles.container}>
      <Modal title={'Employee successfully added'} show={showModal} close={closeModal} />
      <h2>Employees</h2>
      <Button>Form employee</Button>
      <List
        data={formatListData(employeesList)}
        headers={headers}
        resource={resource}
        deleteItem={deleteEmployee}
      />
    </section>
  );
};

export default Employees;
