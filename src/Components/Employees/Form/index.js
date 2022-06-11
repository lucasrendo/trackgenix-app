import React, { useState, useEffect } from 'react';
import Form from '../../Shared/Form/Form';
import Modal from '../../Shared/Modal/Modal';
import styles from './employee.module.css';
import { useParams, useHistory } from 'react-router-dom';

const EmployeesForm = () => {
  const [employeeList, setEmployeeList] = useState();
  const [projects, setProjects] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const { goBack } = useHistory();
  const [modalMessage, setModalMessage] = useState('');
  const { id } = useParams();
  const [error, setError] = useState(true);
  const resource = '/employees';

  useEffect(() => {
    getEmployee();
    dataOptions();
  });

  const getEmployee = async () => {
    try {
      if (id) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`);
        const jsonResponse = await response.json();
        setEmployeeList(jsonResponse.data);
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

  const dataOptions = async () => {
    const rawProjects = await getProjects();
    let projectsData = [];
    rawProjects.forEach((project, index) => {
      projectsData.push({ id: project._id });
      projectsData[index].text = project.projectName;
    });
    setProjects(projectsData);
  };
  const config = [
    {
      header: 'First Name',
      type: 'text',
      key: 'firstName',
      required: true
    },
    {
      header: 'Last Name',
      type: 'text',
      key: 'lastName',
      required: true
    },
    {
      header: 'Email',
      type: 'email',
      key: 'email',
      required: true
    },
    {
      header: 'Password',
      type: 'password',
      key: 'password',
      required: true
    },
    {
      header: 'Project',
      type: 'select',
      key: 'assignedProjects',
      options: projects,
      required: true
    },
    {
      header: 'Is active',
      type: 'checkbox',
      key: 'isActive',
      required: false
    }
  ];

  const employeeArray = (employee) => {
    const data = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      password: employee.password,
      assignedProjects: [employee.assignedProjects],
      isActive: employee.isActive
    };
    return data;
  };
  const createInstance = async (obj) => {
    try {
      const data = employeeArray(obj);
      const res = await fetch(`${process.env.REACT_APP_API_URL}${resource}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
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
      const data = employeeArray(obj);
      const res = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
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
    if (result && !result.error) setInputValues({});
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <Form
        data={config}
        itemData={employeeList}
        submitHandler={submitHandler}
        userInput={[inputValues, setInputValues]}
      />
      <Modal handleClose={() => closeHandler()} isOpen={isAdding} isConfirmation={false}>
        <h2>{modalMessage}</h2>
      </Modal>
    </section>
  );
};

export default EmployeesForm;
