import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';
import Button from 'Components/Shared/Button';
import { Link } from 'react-router-dom';
import { getSingleEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { resetEmployee, resetMessage } from 'redux/employees/actions.js';
import Joi, { allow } from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';

const HoursForm = () => {
  const id = '62b1122165165c996de858ec';
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employees.isLoading);
  const message = useSelector((state) => state.employees.message);
  const [number, setNumber] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    seven: ''
  });
  const [add, setAdd] = useState();
  const validationSchema = Joi.object({
    monday: Joi.number().min(0).max(12),
    tuesday: Joi.number().min(0).max(12),
    wednesday: Joi.number().min(0).max(12),
    thursday: Joi.number().min(0).max(12),
    friday: Joi.number().min(0).max(12),
    saturday: Joi.number().min(0).max(12),
    sunday: Joi.number().min(0).max(12),
    weekend: Joi.date().required().max(Date.now())
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(validationSchema),
    defaultValues: { one: '', two: '', three: '', four: '', five: '', six: '', seven: '' }
  });

  useEffect(() => {
    reset({});
  }, []);

  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
    return () => dispatch(resetEmployee());
  }, []);

  useEffect(() => {
    const { one, two, three, four, five, six, seven } = number;
    setAdd(
      Number(one) +
        Number(two) +
        Number(three) +
        Number(four) +
        Number(five) +
        Number(six) +
        Number(seven)
    );
  }, [number]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNumber({ ...number, [name]: value });
  };
  const headers = [
    { header: 'Project Name', key: 'Project Name' },
    { header: 'Monday', key: 'Monday' },
    { header: 'Tuesday', key: 'Tuesday' },
    { header: 'Wednesday', key: 'Wednesday' },
    { header: 'Thursday', key: 'Thursday' },
    { header: 'Friday', key: 'Friday' },
    { header: 'Saturday', key: 'Saturday' },
    { header: 'Sunday', key: 'Sunday' },
    { header: 'Total', key: 'Total' }
  ];

  return (
    <section className={styles.container}>
      <h2>Worked Hours</h2>
      <div className={styles.topContainer}>
        <Button>Before</Button>
        <Input
          className={styles.dateInput}
          id={'weekend'}
          register={register}
          type="date"
          error={errors.date?.message}
        />
        <Button>Next</Button>
      </div>
      <div>
        <thead>
          <tr className={styles.headerRow}>
            {headers.map((header, index) => {
              return (
                <th key={index} className={styles.th}>
                  {header.header}
                </th>
              );
            })}
          </tr>
        </thead>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
            <div>
              <h4>Project 1 - Rol</h4>
            </div>
            <Input
              id={'monday'}
              register={register}
              type={'number'}
              error={errors.monday?.message}
              onChange={handleInput}
              name="one"
              value={number.one}
            />
            <Input
              id={'tuesday'}
              register={register}
              type="number"
              onChange={handleInput}
              name="two"
              value={number.two}
            />
            <Input
              id={'wednesday'}
              register={register}
              type="number"
              error={errors.wednesday?.message}
              onChange={handleInput}
              name="three"
              value={number.three}
            />
            <Input
              id={'thursday'}
              register={register}
              type="number"
              error={errors.thursday?.message}
              onChange={handleInput}
              name="four"
              value={number.four}
            />
            <Input
              id={'friday'}
              register={register}
              type="number"
              error={errors.friday?.message}
              onChange={handleInput}
              name="five"
              value={number.five}
            />
            <Input
              id={'saturday'}
              register={register}
              type="number"
              error={errors.saturday?.message}
              onChange={handleInput}
              name="six"
              value={number.six}
            />
            <Input
              id={'sunday'}
              register={register}
              type="number"
              error={errors.sunday?.message}
              onChange={handleInput}
              name="seven"
              value={number.seven}
            />
            <Input readOnly value={add} />
          </form>
          <div>
            <Button classes="block" onClick={() => reset()}>
              Confirm
            </Button>
          </div>
        </>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default HoursForm;
