import { useState, useEffect } from 'react';
import { useParams, useHistory, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetEmployee, resetMessage } from '../../../redux/employees/actions';
import { getSingleEmployee, createEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal/Modal';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import styles from './index.module.css';
import Joi from 'joi';

const EmployeeProfile = () => {
  const { id } = useParams();
  const { goBack } = useHistory();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.employee);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const error = useSelector((state) => state.employees.error);
  const message = useSelector((state) => state.employees.message);
  const validationSchema = Joi.object({
    firstName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .label('First Name')
      .min(3)
      .max(20)
      .required(),
    lastName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .label('Last Name')
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().label('Password').min(8).required(),
    isActive: Joi.boolean()
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isActive: false
    },
    reValidateMode: 'onBlur',
    resolver: joiResolver(validationSchema)
  });

  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
    return () => dispatch(resetEmployee());
  }, []);

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

  const submitHandler = async (data) => {
    dispatch(createEmployee(data));
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
          <Input
            id={'isActive'}
            text={'Is active'}
            type={'checkbox'}
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

export default EmployeeProfile;
