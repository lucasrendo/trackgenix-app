import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetEmployee, resetMessage } from '../../../redux/employees/actions';
import { getSingleEmployee, createEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal/Modal';
import Input from 'Components/Shared/Input';
import styles from './index.module.css';
import Joi from 'joi';

const EmployeeProfile = () => {
  const { id } = useParams();
  const [inputValues, setInputValues] = useState({});
  const { goBack } = useHistory();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.employee);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const error = useSelector((state) => state.employees.error);
  const message = useSelector((state) => state.employees.message);
  const validationSchema = Joi.object({
    firstName: Joi.string().label('First Name').min(3).max(10).required(),
    lastName: Joi.string().label('Last Name').min(3).max(10).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required('Email is required'),
    repeatEmail: Joi.string().label('Repeat Email').required().valid(Joi.ref('email')),
    password: Joi.string().label('Password').min(8).required(),
    repeatPassword: Joi.string().label('Repeat Password').required().valid(Joi.ref('password')),
    secretWord: Joi.string().label('Secret Word').min(8).required(),
    repeatSecreteWord: Joi.string()
      .label('Repeat Secret Word')
      .required()
      .valid(Joi.ref('secretWord')),
    address: Joi.string().label('Address').min(3).max(10).required(),
    birthDate: Joi.date().label('Birth Date').required().max(Date.now())
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    // defaultValues,
    resolver: joiResolver(validationSchema)
  });

  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
    return () => dispatch(resetEmployee());
  }, []);

  // const config = [
  //   {
  //     header: 'First Name',
  //     type: 'text',
  //     key: 'firstName',
  //     required: true
  //   },
  //   {
  //     header: 'Last Name',
  //     type: 'text',
  //     key: 'lastName',
  //     required: true
  //   },
  //   {
  //     header: 'Email',
  //     type: 'email',
  //     key: 'email',
  //     required: true
  //   },
  //   {
  //     header: 'Repeat Email',
  //     type: 'email',
  //     key: 'email',
  //     required: true
  //   },
  //   {
  //     header: 'Password',
  //     type: 'password',
  //     key: 'password',
  //     required: true
  //   },
  //   {
  //     header: 'Repeat Password',
  //     type: 'password',
  //     key: 'password',
  //     required: true
  //   },
  //   {
  //     header: 'Secret Word',
  //     type: 'password',
  //     key: 'password',
  //     required: true
  //   },
  //   {
  //     header: 'Repeat Secret Word',
  //     type: 'password',
  //     key: 'password',
  //     required: true
  //   },
  //   {
  //     header: 'Address',
  //     type: 'text',
  //     key: 'address',
  //     required: false
  //   },
  //   {
  //     header: 'Birth Date',
  //     type: 'date',
  //     key: 'birthDate',
  //     required: true
  //   }
  // ];

  useEffect(() => {
    reset(employee);
  }, [employee]);

  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createEmployee(inputValues));
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <h2>User Profile</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
          <Input
            id={'firstName'}
            register={register}
            text={'First Name'}
            type="text"
            error={errors.firstName?.message}
          />
          <Input
            id={'lastName'}
            text={'Last Name'}
            type="text"
            register={register}
            error={errors.lastName?.message}
          />
          <Input
            id={'email'}
            text={'Email'}
            type={'email'}
            register={register}
            error={errors.email?.message}
          />
          <Input
            id={'repeatEmail'}
            text={'Repeat Email'}
            type={'email'}
            register={register}
            error={errors.repeatEmail}
          />
          <Input
            id={'password'}
            text={'Password'}
            type={'password'}
            register={register}
            error={errors.password}
          />
          <Input
            id={'repeatPassword'}
            text={'Repeat Password'}
            type={'password'}
            register={register}
            error={errors.repeatPassword}
          />
          <Input
            id={'secretWord'}
            text={'Secret Word'}
            type={'password'}
            register={register}
            error={errors.secretWord}
          />
          <Input
            id={'repeatSecretWord'}
            text={'Repeat Secret Word'}
            type={'password'}
            register={register}
            error={errors.repeatSecreteWord}
          />
          <Input
            id={'address'}
            register={register}
            text={'Address'}
            type={'text'}
            error={errors.address}
          />
          <Input
            id={'birthDate'}
            register={register}
            text={'Birth Date'}
            type={'date'}
            error={errors.birthDate}
          />
        </form>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default EmployeeProfile;
