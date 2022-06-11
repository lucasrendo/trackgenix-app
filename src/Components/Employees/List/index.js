import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import List from '../../Shared/List/List';
import Button from '../../Shared/Button/Button';
import Loading from '../../Shared/Loading/Loading';
import styles from './employees.module.css';

const Employees = () => {
  const [employeesList, setEmployeesList] = useState([]);
  const [method, setMethod] = useState('POST');
  const [isLoading, setIsLoading] = useState([true]);
  const resource = '/employees';

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}`);
      const jsonResponse = await response.json();
      setEmployeesList(jsonResponse.data);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const deleteEmployee = (id) => {
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = response.json();
      alert(`Project ${data.data.firstName} was deleted successfully`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setEmployeesList([...employeesList.filter((employee) => employee._id !== id)]);
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

  return isLoading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>Employees</h2>
      <List
        fullList={employeesList}
        data={formatListData(employeesList)}
        headers={headers}
        resource={resource}
        deleteItem={deleteEmployee}
        method={method}
      />
      <div>
        <Link to={'employees/form'} className={styles.LinkReset}>
          <Button classes="block">Create Employee</Button>
        </Link>
      </div>
    </section>
  );
};

export default Employees;
