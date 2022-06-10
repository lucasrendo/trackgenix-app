import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from '../../Shared/Form/Form';
import Modal from '../../Shared/Modal/Modal';
import styles from './index.module.css';

const TimeSheets = () => {
  const { id } = useParams();
  const { goBack } = useHistory();
  const [timeSheet, setTimeSheet] = useState();
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const resource = '/timesheets';
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

  useEffect(async () => {
    fetchTimeSheet();
    formatDataOptions();
  }, []);

  // === Fetch functions === //
  const fetchTimeSheet = async () => {
    try {
      if (id) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`);
        const jsonResponse = await response.json();
        setTimeSheet(jsonResponse.data);
      }
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  // === format option objects for the form config === //
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

    setModalMessage(result.message);
    setIsAdding(true);
    if (result && !result.err) {
      setInputValues({});
      setModalMessage(result.message);
      setIsAdding(true);
    }
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <Form
        data={config}
        itemData={timeSheet}
        submitHandler={submitHandler}
        userInput={[inputValues, setInputValues]}
      />
      <Modal
        handleClose={() => {
          setIsAdding(false);
          id && goBack();
        }}
        isOpen={isAdding}
        isConfirmation={false}
      >
        <h2>{modalMessage}</h2>
      </Modal>
    </section>
  );
};

export default TimeSheets;
