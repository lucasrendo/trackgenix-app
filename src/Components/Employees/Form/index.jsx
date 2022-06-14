import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetEmployee, resetMessage } from '../../../redux/employees/actions';
import { getUniqueEmployee, createEmployee, editEmployees } from '../../../redux/employees/thunks';
import Form from '../../Shared/Form/Form';
import Modal from '../../Shared/Modal/Modal';
import Loading from '../../Shared/Loading/Loading';
import styles from './employee.module.css';

const EmployeesForm = () => {
  const [projects, setProjects] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const { goBack } = useHistory();
  const [modalMessage, setModalMessage] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.employees.list);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const error = useSelector((state) => state.employees.error);
  const message = useSelector((state) => state.employees.message);

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
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

  useEffect(() => {
    id && dispatch(getUniqueEmployee(id));
    dataOptions();
    return () => dispatch(resetEmployee());
  }, []);

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

  const closeHandler = () => {
    setModalMessage(false);
    dispatch(resetMessage());
    setIsAdding(false);
    if (!error) {
      goBack();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editEmployees(inputValues, id));
    } else {
      dispatch(createEmployee(inputValues));
      setIsAdding(true);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          data={config}
          itemData={list}
          submitHandler={submitHandler}
          userInput={[inputValues, setInputValues]}
        />
      )}
      <Modal handleClose={() => closeHandler()} isOpen={isAdding} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default EmployeesForm;
