import React, { useState, useEffect } from 'react';
import Form from '../../Shared/Form/Form';
import Modal from '../../Shared/Modal/Modal';
import styles from './tasks.module.css';
import { useParams, useHistory } from 'react-router-dom';

function Tasks() {
  const [tasksList, setTasksList] = useState();
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const { goBack } = useHistory();
  const [modalMessage, setModalMessage] = useState('');
  const { id } = useParams();
  const [error, setError] = useState(true);
  const resource = '/tasks';

  useEffect(() => {
    getTask();
    dataOptions();
  }, []);

  const getTask = async () => {
    try {
      if (id) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`);
        const jsonResponse = await response.json();
        setTasksList(jsonResponse.data);
      }
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  const getProjects = async () => {
    try {
      const reponse = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonResponse = await reponse.json();
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

  const closeHandler = () => {
    if (error) setIsAdding(false);
    else {
      setIsAdding(false);
      goBack();
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

    setError(result.err);
    setModalMessage(result.message);
    setIsAdding(true);
    if (result && result.error === false) setInputValues({});
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <Form
        data={config}
        itemData={tasksList}
        submitHandler={submitHandler}
        userInput={[inputValues, setInputValues]}
      />
      <Modal handleClose={() => closeHandler()} isOpen={isAdding} isConfirmation={false}>
        <h2>{modalMessage}</h2>
      </Modal>
    </section>
  );
}

export default Tasks;
