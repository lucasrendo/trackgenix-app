import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { addEmployee, editEmployees, getSingleEmployee } from 'redux/thunks/admin';
import { resetAdmin, resetMessage } from 'redux/admins/actions';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import styles from './admins.module.css';

const AdminsForm = () => {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admins.admin);
  const error = useSelector((state) => state.admins.error);
  const message = useSelector((state) => state.admins.message);
  const [modalMessage, setModalMessage] = useState(false);

  const adminValidate = Joi.object({
    firstName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .label('First Name')
      .min(4)
      .max(15)
      .required(),
    lastName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .label('Last Name')
      .min(4)
      .max(15)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().label('password').min(8).required(),
    confirmPassword: Joi.ref('password')
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(adminValidate),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
    return () => dispatch(resetAdmin());
  }, []);

  useEffect(() => {
    reset(admin);
  }, [admin]);

  const closeHandler = () => {
    setModalMessage(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = (data) => {
    if (id) {
      dispatch(editEmployees(data, id));
    } else {
      dispatch(addEmployee(data));
    }
    setModalMessage(true);
  };

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <div className={styles.inputsContainer}>
          <h2 className={styles.header}>New Admin Account</h2>
          <Input
            id={'firstName'}
            register={register}
            text={'First Name'}
            type={'text'}
            error={errors.firstName}
          />
          <Input
            id={'lastName'}
            register={register}
            text={'Last Name'}
            type={'text'}
            error={errors.lastName}
          />
          <Input
            id={'email'}
            register={register}
            text={'Email'}
            type={'email'}
            error={errors.email}
          />
          <Input
            id={'password'}
            register={register}
            text={'Password'}
            type={'password'}
            error={errors.password}
          />
          <Input
            id={'confirmPassword'}
            register={register}
            text={'Confirm password'}
            type={'password'}
            error={errors.confirmPassword}
          />
        </div>

        <div className={styles.btnsContainer}>
          <Button classes={'darker'}>Create Account</Button>
          <Button classes={'red'} onClick={() => goBack()}>
            Cancel
          </Button>
        </div>
      </form>
      <Modal handleClose={() => closeHandler()} isOpen={modalMessage} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default AdminsForm;
