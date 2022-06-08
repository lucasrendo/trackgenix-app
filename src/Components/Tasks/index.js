import React, { useState, useEffect } from 'react';
import styles from './tasks.module.css';
import Form from '../Shared/Form/Form';
import List from './List/list';
import Loading from '../Shared/Loading/Loading';
import Button from '../Shared/Button/Button';
import { Link } from 'react-router-dom';

function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  //const [screen, changeScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const resource = 'tasks';
  //const [formMethod, setMethod] = useState('POST');
  //const [updTaskId, setId] = useState('');

  useEffect(() => {
    getTask();
    dataOptions();
  }, []);

  const getTask = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/${resource}`);
      const body = await res.json();
      setTasksList(body.data);
      setLoading(false);
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

  //const editTask = (id) => {
  //  setMethod('PUT');
  //  changeScreen(true);
  //  setId(id);
  //};

  const deleteItem = (_id) => {
    setTasksList([...tasksList.filter((task) => task._id !== _id)]);
    window.alert('Task successfully deleted');
  };

  //const backToList = () => {
  //  setMethod('GET');
  //  changeScreen(false);
  //  alert('Successfully updated!');
  //};

  const config = [
    {
      header: 'Employee',
      type: 'select',
      key: 'employeeId',
      options: employees,
      required: true
    },
    {
      header: 'Project',
      type: 'select',
      key: 'projectId',
      options: projects,
      required: true
    },
    {
      header: 'Title',
      type: 'text',
      key: 'title',
      required: true
    },
    {
      header: 'Description',
      type: 'text',
      key: 'description',
      required: true
    },
    {
      header: 'Date',
      type: 'date',
      key: 'date',
      required: true
    },
    {
      header: 'Done',
      type: 'checkbox',
      key: 'done',
      required: false
    }
  ];

  return loading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <List
        list={tasksList}
        setList={setTasksList}
        deleteItem={deleteItem}
        resource={resource}
        //editTask={editTask}
        data={config}
      />
      <div>
        <Link
          to={{
            pathname: '/tasks/form',
            linkData: config,
            DBPath: '/tasks'
          }}
          className={styles.LinkReset}
        >
          <Button classes="block">Create a Task</Button>
        </Link>
      </div>
    </section>
  );
}

export default Tasks;
