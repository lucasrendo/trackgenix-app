import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { addAdmin, getSingleAdmin, editAdmin } from 'redux/thunks/super-admin';
import { resetMessage, resetAdmin } from 'redux/superadmin/actions';
import { toggleModal } from 'redux/global/actions';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import styles from './createAdmin.module.css';

const AdminsForm = () => {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.superAdmin.admin);
  const error = useSelector((state) => state.superAdmin.error);
  const message = useSelector((state) => state.superAdmin.message);
  const showModal = useSelector((state) => state.global.showModal);
  const adminValidate = Joi.object({
    firstName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .label('First Name')
      .min(4)
      .max(15)
      .messages({ 'string.pattern.base': 'First name must be only letters' })
      .required(),
    lastName: Joi.string()
      .pattern(new RegExp(/^[a-zA-Z ]+$/))
      .label('Last Name')
      .min(4)
      .max(15)
      .messages({ 'string.pattern.base': 'Last name must be only letters' })
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label('Email')
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
    mode: 'onBlur',
    resolver: joiResolver(adminValidate),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isActive: true
    }
  });

  useEffect(() => {
    id && dispatch(getSingleAdmin(id));
    return () => dispatch(resetAdmin());
  }, []);

  useEffect(() => {
    reset(admin);
  }, [admin]);

  const closeHandler = () => {
    dispatch(toggleModal(false));
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = (data) => {
    if (id) {
      dispatch(editAdmin(data, id));
    } else {
      dispatch(addAdmin(data));
    }
    dispatch(toggleModal(true));
  };

  return (
    <section className={styles.container}>
      {id ? <h2>Modify Admin</h2> : <h2>New Admin Account</h2>}
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
        </div>
        <div className={styles.btnsContainer}>
          <Button classes={'darker'}>Create Account</Button>
          <Button classes={'red'} onClick={() => goBack()}>
            Back
          </Button>
          {id ? <Button>Modify Account</Button> : <Button>Create Account</Button>}
        </div>
      </form>
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        {id ? (
          <h2>{message ? message : 'Editing admin...'}</h2>
        ) : (
          <h2>{message ? message : 'Creating admin...'}</h2>
        )}
      </Modal>
    </section>
  );
};

export default AdminsForm;
