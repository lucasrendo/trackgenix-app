import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Modal from '../../Shared/Modal/Modal';
import Form from '../../Shared/Form/Form';
import styles from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, editProject, getSingleProject } from '../../../redux/projects/thunks';
import Loading from '../../Shared/Loading/Loading';
import { resetProject } from '../../../redux/projects/actions';

function Projects() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.project);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const error = useSelector((state) => state.projects.error);
  const message = useSelector((state) => state.projects.message);

  const config = [
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
    id && dispatch(getSingleProject(id));
    formatDataOptions();
    return () => dispatch(resetProject);
  }, []);

  const getEmployees = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      alert(error);
      setShowModal(true);
    }
  };

  const getAdmins = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      alert(error);
      setShowModal(true);
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
    });
    rawEmployees.forEach((employee, index) => {
      employeesData.push({ id: employee._id });
      employeesData[index].text = `${employee.firstName} ${employee.lastName}`;
    });
    setAdmins(adminsData);
    setEmployees(employeesData);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editProject(inputValues, id));
    } else {
      dispatch(addProject(inputValues));
    }
    setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
    if (!error) {
      goBack();
    }
  };

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          data={config}
          itemData={project}
          submitHandler={submitHandler}
          userInput={[inputValues, setInputValues]}
        />
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default Projects;
