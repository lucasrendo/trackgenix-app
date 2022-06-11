import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal/Modal';
import Form from '../../Shared/Form/Form';
import styles from './index.module.css';

function Projects() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const [project, setProject] = useState();
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [error, setError] = useState(true);
  const resource = '/projects';

  const data = [
    {
      header: 'Project Name',
      type: 'text',
      key: 'projectName',
      required: true
    },
    {
      header: 'Description',
      type: 'text',
      key: 'description',
      required: false
    },
    {
      header: 'Start Date',
      type: 'date',
      key: 'startDate',
      required: true
    },
    {
      header: 'End Date',
      type: 'date',
      key: 'endDate',
      required: false
    },
    {
      header: 'Admin',
      type: 'select',
      key: 'admin',
      options: admins,
      required: true
    },
    {
      header: 'Client',
      type: 'text',
      key: 'client',
      required: true
    },
    {
      header: 'Employees',
      type: 'select',
      key: 'employees',
      options: employees,
      required: true
    },
    {
      header: 'Role',
      type: 'text',
      key: 'role',
      required: true
    },
    {
      header: 'Rate',
      type: 'number',
      key: 'rate',
      required: true
    },
    {
      header: 'Hours in projects',
      type: 'number',
      key: 'hoursInProject',
      required: true
    },
    {
      header: 'Is active',
      type: 'checkbox',
      key: 'isActive',
      required: false
    }
  ];

  useEffect(() => {
    formatDataOptions();
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      if (id) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`);
        const body = await response.json();
        setProject(body.data);
      }
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  const projectArray = (project) => {
    const data = {
      projectName: project.projectName,
      description: project.description,
      admin: project.admin,
      client: project.client,
      startDate: project.startDate,
      endDate: project.endDate,
      isActive: project.isActive,
      employees: []
    };
    data.employees.push({
      employeeId: project.employees,
      role: project.role,
      rate: project.rate,
      hoursInProject: project.hoursInProject
    });
    return data;
  };

  const createInstance = async (obj) => {
    try {
      const data = projectArray(obj);
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
      const data = projectArray(obj);
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
    if (result && !result.err) {
      setInputValues({});
      setModalMessage(result.message);
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

  const getEmployees = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  const getAdmins = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  const formatDataOptions = async () => {
    const rawEmployees = await getEmployees();
    const rawAdmins = await getAdmins();
    let adminsData = [];
    let employeesData = [];
    rawAdmins.forEach((admin, index) => {
      adminsData.push({ id: admin._id });
      adminsData[index].text = `${admin.firstName} ${admin.lastName}`;
      setAdmins(adminsData);
    });
    rawEmployees.forEach((employee, index) => {
      employeesData.push({ id: employee._id });
      employeesData[index].text = `${employee.firstName} ${employee.lastName}`;
      setEmployees(employeesData);
    });
  };

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <Form
        data={data}
        itemData={project}
        submitHandler={submitHandler}
        userInput={[inputValues, setInputValues]}
      />
      <Modal handleClose={() => closeHandler()} isOpen={isAdding} isConfirmation={false}>
        <h2>{modalMessage}</h2>
      </Modal>
    </section>
  );
}

export default Projects;
