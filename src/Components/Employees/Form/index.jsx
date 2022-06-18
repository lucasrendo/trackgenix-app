import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { resetEmployee, resetMessage } from '../../../redux/employees/actions';
import { getSingleEmployee, createEmployee, editEmployees } from '../../../redux/employees/thunks';
import { getProjects } from '../../../redux/projects/thunks';

import Modal from '../../Shared/Modal/Modal';
import Loading from '../../Shared/Loading';
import styles from './employee.module.css';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';

const EmployeesForm = () => {
  //const [projects, setProjects] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const { goBack } = useHistory();
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const [formattedProjects, setFormattedProjects] = useState();
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.employee);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const error = useSelector((state) => state.employees.error);
  const message = useSelector((state) => state.employees.message);
  const projects = useSelector((state) => state.projects.list);
  const projectsLoading = useSelector((state) => state.projects.isLoading);
  const { handleSubmit } = useForm();

  console.log(projects);

  // const getProjects = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
  //     const jsonResponse = await response.json();
  //     return jsonResponse.data;
  //   } catch (error) {
  //     alert(error);
  //     setShowModal(true);
  //   }
  // };
  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
    dispatch(getProjects());
    return () => dispatch(resetEmployee());
  }, []);

  useEffect(() => {
    dataOptions();
    console.log(config);
  }, [projects]);

  const dataOptions = () => {
    let projectsData = [];
    projects.forEach((project) => {
      projectsData.push({ id: project._id, text: project.projectName });
    });
    setFormattedProjects(projectsData);
  };

  const config = {
    title: 'Project',
    type: 'select',
    key: 'assignedProjects',
    options: formattedProjects,
    required: true
  };
  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editEmployees(inputValues, id));
    } else {
      dispatch(createEmployee(inputValues));
    }
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {isLoading || projectsLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(submitHandler())} className={styles.form}>
          <Input text={'First Name'} type={'text'} />
          <Input text={'Last Name'} type={'text'} />
          <Input text={'Email'} type={'email'} />
          <Input text={'Password'} type={'password'} />
          <Select type={'select'} text={'Projects'} item={config}></Select>
          <Input type={'checkbox'} text={'Is Active?'} />
          <div className={styles.btnsContainer}>
            <Button classes={'red'} onClick={() => goBack()}>
              Back
            </Button>
            <Button>Save</Button>
          </div>
        </form>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default EmployeesForm;
