import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetMessage } from 'redux/employees/actions';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import styles from './index.module.css';
import Joi from 'joi';
import { getSingleEmployee } from 'redux/thunks/employee';

const EmployeeProfile = () => {
  const { goBack } = useHistory();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user._id);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const error = useSelector((state) => state.employees.error);
  const validationSchema = Joi.object({
    firstName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .label('First Name')
      .min(3)
      .max(20)
      .messages({
        'string.pattern.base': `First Name should only have letters`
      })
      .required(),
    lastName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .label('Last Name')
      .min(3)
      .max(20)
      .messages({
        'string.pattern.base': `Last Name should only have letters`
      })
      .required(),
    address: Joi.string().label('Address').min(8).required(),
    birthDate: Joi.date().label('Birth Date').required().max(Date.now())
  });

  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      birthDate: ''
    },
    mode: 'onBlur',
    resolver: joiResolver(validationSchema)
  });

  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  const submitHandler = (data) => {
    if (data) setShowModal(true);
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
            className={styles.texterea}
          />
          <Input
            id={'lastName'}
            text={'Last Name'}
            type={'text'}
            register={register}
            error={errors.lastName}
            className={styles.texterea}
          />
          <Input
            id={'address'}
            text={'Address'}
            type={'text'}
            register={register}
            error={errors.address}
            className={styles.texterea}
          />
          <Input
            id={'birthDate'}
            text={'Birth Date'}
            type={'date'}
            register={register}
            error={errors.birthDate}
            className={styles.texterea}
          />
          <div className={styles.btnsContainer}>
            <Button classes={'red'} onClick={() => goBack()}>
              Cancel
            </Button>
            <Button>Save changes</Button>
          </div>
        </form>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>User Profile successfully created</h2>
      </Modal>
    </section>
  );
};

export default EmployeeProfile;
