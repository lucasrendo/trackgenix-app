import React, { useState, useEffect } from 'react';
import List from '../../Shared/List/List';
import Form from '../../Shared/Form/Form';
import Loading from '../../Shared/Loading/Loading';
import Button from '../../Shared/Button/Button';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { useParams, useHistory } from 'react-router-dom';

const TimeSheets = () => {
  const [timeSheet, setTimeSheet] = useState();
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const { goBack } = useHistory;
  const [modalMessage, setModalMessage] = useState('');
  const resource = '/timesheets';
  const { id } = useParams();

  const config = [
    {
      header: 'Employee',
      type: 'select',
      key: 'employee',
      options: employees,
      required: true
    },
    {
      header: 'Project',
      type: 'select',
      key: 'project',
      options: projects,
      required: true
    },
    {
      header: 'Role',
      type: 'text',
      key: 'role',
      required: true
    },
    {
      header: 'Date',
      type: 'date',
      key: 'date',
      required: true
    },
    {
      header: 'Rate',
      type: 'number',
      key: 'rate',
      required: true
    },
    {
      header: 'Worked Hours',
      type: 'number',
      key: 'workedHours',
      required: true
    },
    {
      header: 'Description',
      type: 'text',
      key: 'description'
    },
    {
      header: 'Tasks',
      type: 'select',
      key: 'task',
      options: tasks
    }
  ];

  const fetchTimeSheet = async () => {
    try {
      if (id) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`);
        const jsonResponse = await response.json();
        setTimeSheet(jsonResponse.data);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(async () => {
    fetchTimeSheet();
    formatDataOptions();
  }, []);

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const formatDataOptions = async () => {
    const rawProjects = await getProjects();
    const rawEmployees = await getEmployees();
    const rawTasks = await getTasks();
    let projectsData = [];
    let employeesData = [];
    let tasksData = [];
    rawProjects.forEach((project, index) => {
      projectsData.push({ id: project._id });
      projectsData[index].text = project.projectName;
    });
    rawEmployees.forEach((employee, index) => {
      employeesData.push({ id: employee._id });
      employeesData[index].text = `${employee.firstName} ${employee.lastName}`;
    });
    rawTasks.forEach((task, index) => {
      tasksData.push({ id: task._id });
      tasksData[index].text = task.title;
    });
    setProjects(projectsData);
    setEmployees(employeesData);
    setTasks(tasksData);
  };

  // === Fetch functions === key
  const createInstance = async (obj) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${resource}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const body = await res.json();
      return { message: body.message, err: body.error };
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  const updateInstance = async (obj) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const body = await res.json();
      return { message: body.message, err: body.error };
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  // === Handle submit data and method === //
  const submitHandler = async (e) => {
    e.preventDefault();
    let result;

    if (id) {
      result = await updateInstance(inputValues);
    } else {
      result = await createInstance(inputValues);
    }

    if (result && result.error === false) setInputValues({});
    setModalMessage(result.message);
    setIsAdding(true);
    if (id) goBack();
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <Form
        data={config}
        dbPath={resource}
        itemData={timeSheet}
        submitHandler={submitHandler}
        modalMessage={modalMessage}
      />
    </section>
  );
};

export default TimeSheets;
