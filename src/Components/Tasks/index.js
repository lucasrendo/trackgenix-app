import React, { useState, useEffect } from 'react';
import styles from './tasks.module.css';
import Form from '../Shared/Form/Form';
import List from './List/list';

function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [screen, changeScreen] = useState(false);
  const [formMethod, setMethod] = useState('POST');
  const [updTaskId, setId] = useState('');

  useEffect(() => {
    getTask();
    dataOptions();
  }, [formMethod]);

  const getTask = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const body = await res.json();
      setTasksList(body.data);
    } catch (error) {
      alert(error);
    }
  };

  const getProjects = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      alert(error);
    }
  };

  const getEmployees = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      alert(error);
    }
  };

  const dataOptions = async () => {
    const rawProjects = await getProjects();
    const rawEmployees = await getEmployees();
    let projectsData = [];
    let employeesData = [];
    rawEmployees.forEach((employee, index) => {
      employeesData.push({ id: employee._id });
      employeesData[index].text = `${employee.firstName} ${employee.lastName}`;
    });
    rawProjects.forEach((project, index) => {
      projectsData.push({ id: project._id });
      projectsData[index].text = `${project.projectName}`;
    });
    setEmployees(employeesData);
    setProjects(projectsData);
  };

  const editTask = (id) => {
    setMethod('PUT');
    changeScreen(true);
    setId(id);
  };

  const deleteItem = (_id) => {
    setTasksList([...tasksList.filter((task) => task._id !== _id)]);
    window.alert('Task successfully deleted');
  };

  const backToList = () => {
    setMethod('GET');
    changeScreen(false);
    alert('Successfully updated!');
  };

  const data = [
    {
      title: 'Employee',
      type: 'select',
      id: 'employeeId',
      options: employees,
      required: true
    },
    {
      title: 'Project',
      type: 'select',
      id: 'projectId',
      options: projects,
      required: true
    },
    {
      title: 'Title',
      type: 'text',
      id: 'title',
      required: true
    },
    {
      title: 'Description',
      type: 'text',
      id: 'description',
      required: true
    },
    {
      title: 'Date',
      type: 'date',
      id: 'date',
      required: true
    },
    {
      title: 'Done',
      type: 'checkbox',
      id: 'done',
      required: false
    }
  ];

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div>
        <button
          onClick={() => {
            changeScreen(false);
            setMethod('GET');
          }}
          className={styles.btn}
        >
          List of Tasks
        </button>
        <button
          onClick={() => {
            changeScreen(true);
            setMethod('POST');
          }}
          className={styles.btn}
        >
          Create Task
        </button>
      </div>
      {screen ? (
        <Form data={data} formMethod={formMethod} back={() => backToList()} id={updTaskId} />
      ) : (
        <List
          list={tasksList}
          setList={setTasksList}
          deleteItem={deleteItem}
          editTask={editTask}
          data={data}
        />
      )}
    </section>
  );
}

export default Tasks;
