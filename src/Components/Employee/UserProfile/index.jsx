import { useEffect } from 'react';
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
import { editEmployees, getSingleEmployee } from 'redux/thunks/employee';
import { toggleModal } from 'redux/global/actions';

const EmployeeProfile = () => {
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user._id);
  const message = useSelector((state) => state.employees.message);
  const employee = useSelector((state) => state.employees.employee);
  const showModal = useSelector((state) => state.global.showModal);
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

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
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

  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
  }, []);

  useEffect(() => {
    reset({
      firstName: employee.firstName,
      lastName: employee.lastName,
      address: employee.address,
      birthDate: employee.birthDate.substring(0, 10)
    });
  }, []);

  const closeHandler = () => {
    dispatch(toggleModal());
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  const submitHandler = (data) => {
    const reqData = {
      assignedProject: employee.assignedProject,
      isActive: employee.isActive,
      secretWord: employee.secretWord,
      ...data
    };
    dispatch(editEmployees(reqData, id));
    dispatch(toggleModal());
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
            id={'address'}
            text={'Address'}
            type={'text'}
            register={register}
            error={errors.address}
          />
          <Input
            id={'birthDate'}
            text={'Birth Date'}
            type={'date'}
            register={register}
            error={errors.birthDate}
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
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default EmployeeProfile;
