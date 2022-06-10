import React, { useState, useEffect } from 'react';
import List from '../../Shared/List/List';
import Form from '../../Shared/Form/Form';
import Loading from '../../Shared/Loading/Loading';
import Button from '../../Shared/Button/Button';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const TimeSheets = () => {
  const [timeSheetsList, setTimeSheets] = useState([]);
  const [method, setMethod] = useState('POST');
  const [isLoading, setIsLoading] = useState([true]);
  const resource = '/timesheets';

  const fetchTimeSheet = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}`);
      const jsonResponse = await response.json();
      setTimeSheets(jsonResponse.data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(async () => {
    fetchTimeSheet();
  }, []);

  const deleteItem = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    setTimeSheets([...timeSheetsList.filter((timeSheet) => timeSheet._id !== id)]);
  };

  const formatListData = (responseData) => {
    const data = responseData.map((timeSheet) => {
      return {
        id: timeSheet._id,
        date: timeSheet.date.slice(0, 10),
        employee: timeSheet.employee
          ? timeSheet.employee.firstName + ' ' + timeSheet.employee.lastName
          : '',
        project: timeSheet.project ? timeSheet.project.projectName : '',
        role: timeSheet.role,
        task: timeSheet.task ? timeSheet.task.title : ''
      };
    });
    return data;
  };

  const headers = [
    { header: 'Date', key: 'date' },
    { header: 'Employee', key: 'employee' },
    { header: 'Project', key: 'project' },
    { header: 'Role', key: 'role' },
    { header: 'Task', key: 'task' }
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <List
        fullList={timeSheetsList}
        data={formatListData(timeSheetsList)}
        headers={headers}
        resource={resource}
        deleteItem={deleteItem}
        method={method}
      />
      <div>
        <Link to={'/timesheets/form'} className={styles.LinkReset}>
          <Button classes="block">Create Timesheet</Button>
        </Link>
      </div>
    </section>
  );
};

export default TimeSheets;
