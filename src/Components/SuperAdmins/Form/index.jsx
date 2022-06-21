import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetMessage, resetSuperAdmin } from '../../../redux/super admins/actions';
import {
  createSuperAdmins,
  editSuperAdmins,
  getSingleSuperAdmins
} from '../../../redux/super admins/thunks';
import Loading from '../../Shared/Loading';
import Form from '../../Shared/Form';
import Modal from '../../Shared/Modal/Modal';
import styles from './super-admins.module.css';
import { appendErrors, useForm } from 'react-hook-form';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const superAdminValidate = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .label('First Name')
    .min(3)
    .max(10)
    .required()
    .messages({
      'string.pattern.base': `First Name must only have letters`,
      'string.empty': `First Name cannot be empty`,
      'string.max': `First name cannot have more than 10 characters`,
      'string.min': `First name must have at least 3 characters`
    }),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .label('Last Name')
    .min(3)
    .max(10)
    .required()
    .messages({
      'string.pattern.base': `Last Name must only have letters`,
      'string.empty': `Last Name cannot be empty`,
      'string.max': `Last name cannot have more than 10 characters`,
      'string.min': `Last name must have at least 3 characters`
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.empty': `Email cannot be empty`
    }),
  password: Joi.string().label('Password').min(8).required().messages({
    'string.empty': `Password cannot be empty`,
    'string.min': `Password must have at least 8 alphanumeric characters`
  }),
  isActive: Joi.boolean()
});

function SuperAdminsForm() {
  const { id } = useParams();
  const [inputValues, setInputValues] = useState({});
  const { goBack } = useHistory();
  const [modalMessage, setModalMessage] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.superAdmins.isLoading);
  const message = useSelector((state) => state.superAdmins.message);
  const error = useSelector((state) => state.superAdmins.error);
  const superAdmin = useSelector((state) => state.superAdmins.superAdmin);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    reValidateMode: 'onChange',
    resolver: joiResolver(superAdminValidate),
    mode: 'onchange'
  });
  // const resource = '/super-admin';

  useEffect(() => {
    id && dispatch(getSingleSuperAdmins(id));
    return () => dispatch(resetSuperAdmin());
  }, []);

  useEffect(() => {
    reset(superAdmin);
  }, [superAdmin]);

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
  //     header: 'Password',
  //     type: 'password',
  //     key: 'password',
  //     required: true
  //   },
  //   {
  //     header: 'Is active',
  //     type: 'checkbox',
  //     key: 'isActive',
  //     required: false
  //   }
  // ];

  const closeHandler = () => {
    setModalMessage(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = async (data) => {
    id ? dispatch(editSuperAdmins(data, id)) : dispatch(createSuperAdmins(data));
    setModalMessage(true);
  };

  // return (
  //   <section className={styles.container}>
  //     <h2>Super Admins</h2>
  //     {isLoading ? (
  //       <Loading />
  //     ) : (
  //       <Form
  //         data={config}
  //         itemData={superAdmin}
  //         submitHandler={submitHandler}
  //         userInput={[inputValues, setInputValues]}
  //       />
  //     )}
  //     <Modal handleClose={() => closeHandler()} isOpen={modalMessage} isConfirmation={false}>
  //       <h2>{message}</h2>
  //     </Modal>
  //   </section>
  // );

  return (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <div className={styles.textContainer}>
          <Input
            id={'firstName'}
            register={register}
            text={'First Name'}
            type={'text'}
            error={errors.firstName}
          />
          {/* {errors.firstName && <p className={styles.errorMessage}>{errors.firstName.message}</p>} */}
        </div>

        <div className={styles.textContainer}>
          <Input
            id={'lastName'}
            text={'Last Name'}
            type={'text'}
            register={register}
            error={errors.lastName}
          />
        </div>

        <div className={styles.textContainer}>
          <Input
            id={'email'}
            text={'Email'}
            type={'email'}
            register={register}
            error={errors.email}
          />
        </div>

        <div className={styles.textContainer}>
          <Input
            id={'password'}
            text={'Password'}
            type={'password'}
            register={register}
            error={errors.password}
          />
        </div>

        <div className={styles.checkContainer}>
          <Input
            id={'isActive'}
            type={'checkbox'}
            text={'Is Active?'}
            required={false}
            register={register}
            error={errors.isActive}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button>Okay</Button>
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
}

export default SuperAdminsForm;
