import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { resetEmployee, resetMessage } from '../../../redux/employees/actions';
import { getSingleEmployee, createEmployee, editEmployees } from '../../../redux/employees/thunks';
import { getProjects } from '../../../redux/projects/thunks';
import Joi from 'joi';

import Modal from '../../Shared/Modal/Modal';
import Loading from '../../Shared/Loading';
import styles from './employee.module.css';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';

const employeeValidate = Joi.object({
  firstName: Joi.string().label('First Name').min(3).max(10).required(),
  lastName: Joi.string().label('Last Name').min(3).max(10).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required('Email is required'),
  password: Joi.string().label('Password').min(8).required(),
  assignedProjects: Joi.string().label('Project').required(),
  isActive: Joi.boolean()
});

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
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(employeeValidate)
  });

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
  }, [projects]);

  useEffect(() => {
    reset(employee);
  }, [employee]);

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

  const submitHandler = async (data) => {
    console.log(data);
    if (id) {
      dispatch(editEmployees(data, id));
    } else {
      dispatch(createEmployee(data));
    }
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {isLoading || projectsLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
          <Input
            id={'firstName'}
            register={register}
            text={'First Name'}
            type={'text'}
            error={errors.firstName}
          />
          <Input
            id={'lastName'}
            text={'Last Name'}
            type={'text'}
            register={register}
            error={errors.lastName}
          />
          <Input
            id={'email'}
            text={'Email'}
            type={'email'}
            register={register}
            error={errors.email}
          />
          <Input
            id={'password'}
            text={'Password'}
            type={'password'}
            register={register}
            error={errors.password}
          />
          <Select
            id={'assignedProjects'}
            type={'select'}
            text={'Projects'}
            item={config}
            register={register}
            error={errors.assignedProjects}
          />
          <Input
            id={'isActive'}
            type={'checkbox'}
            text={'Is Active?'}
            required={false}
            register={register}
            error={errors.isActive}
          />
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
