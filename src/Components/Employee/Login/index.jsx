import joi from 'joi';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from 'login.module.css';
// import { login, getUser } from 'redux/auth/thunks'

const loginValidations = joi.object({
  email: joi.email().required().label('Email').messages({
    'string.empty': `Invalid credentials`
  }),
  password: joi.password().required().label('Password').min(8).alphanumeric().messages({
    'string.empty': `Invalid credentials`,
    'string.min': `Invalid credentials`
  })
})

function Login () {
  const { goBack } = useHistory();
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(loginValidations),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => reset(), []);

  const submitHandler = (data) => {
    dispatch(login(data));
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <Input type="email" id="email" text="Email" error={errors.email} register={register} />
          <Input
            type="password"
            id="password"
            text="Password"
            error={errors.password}
            register={register}
          />
          <div className={styles.btnsContainer}>
            <Button classes={'red'} onClick={() => goBack()}>
              Back
            </Button>
            <Button>Log in</Button>
          </div>
        </form>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default Login;
