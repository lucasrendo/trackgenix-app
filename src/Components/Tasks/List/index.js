import React, { useState, useEffect } from 'react';
import Form from '../../Shared/Form/Form';
import List from '../../Shared/List/List';
import Button from '../../Shared/Button/Button';
import Loading from '../../Shared/Loading/Loading';
import { Link } from 'react-router-dom';
import styles from './tasks.module.css';

function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const [method, setMethod] = useState('POST');
  const [isLoading, setIsLoading] = useState([true]);
  const resource = '/tasks';

  const getTask = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}`);
      const jsonResponse = await response.json();
      setTasksList(jsonResponse.data);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const deleteItem = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    window.alert('Task successfully deleted');
    setTasksList([...tasksList.filter((task) => task._id !== id)]);
  };

  const formatTaskData = (responseData) => {
    const data = responseData.map((task) => {
      return {
        id: task._id,
        employee: task.employeeId ? task.employeeId.firstName + ' ' + task.employeeId.lastName : '',
        project: task.projectId ? task.projectId.projectName : '',
        title: task.title,
        description: task.description,
        date: task.date.slice(0, 10),
        done: task.done.toString()
      };
    });
    return data;
  };

  const headers = [
    { header: 'Employee', key: 'employee' },
    { header: 'Project', key: 'project' },
    { header: 'Title', key: 'title' },
    { header: 'Description', key: 'description' },
    { header: 'Date', key: 'date' },
    { header: 'Done', key: 'done' }
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <List
        fullList={tasksList}
        data={formatTaskData(tasksList)}
        headers={headers}
        resource={resource}
        deleteItem={deleteItem}
        method={method}
      />
      <div>
        <Link to={'/tasks/form'} className={styles.LinkReset}>
          <Button classes="block">Create Task</Button>
        </Link>
      </div>
    </section>
  );
}

export default Tasks;
