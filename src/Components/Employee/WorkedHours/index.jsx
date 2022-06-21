import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';
// import { Link } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import { getSingleEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { resetEmployee, resetMessage } from 'redux/employees/actions.js';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';

const HoursForm = () => {
  const { id } = useParams();
  const { goBack } = useHistory();
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.employee);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const error = useSelector((state) => state.employees.error);
  const message = useSelector((state) => state.employees.message);
  const [number, setNumber] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    seven: 0
  });
  const [add, setAdd] = useState();
  const validationSchema = Joi.object({
    monday: Joi.number().required().min(1).max(12),
    tuesday: Joi.number().min(1, 'ERROR').max(12, 'ERROR'),
    wednesday: Joi.number().min(1, 'ERROR').max(12, 'ERROR'),
    thursday: Joi.number().min(1, 'ERROR').max(12),
    friday: Joi.number().min(1).max(12),
    saturday: Joi.number().min(1).max(12),
    sunday: Joi.number().min(1).max(12),
    weekend: Joi.date().required().max(Date.now())
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(validationSchema)
  });

  useEffect(() => {
    reset(employee);
  }, [employee]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };
  const headers = [
    { header: 'Project Name', key: 'Project Name' },
    { header: 'Monday', key: 'monday' },
    { header: 'Tuesday', key: 'tuesday' },
    { header: 'Wednesday', key: 'wednesday' },
    { header: 'Thursday', key: 'thursday' },
    { header: 'Friday', key: 'friday' },
    { header: 'Saturday', key: 'saturday' },
    { header: 'Sunday', key: 'sunday' },
    { header: 'Total', key: 'total' }
  ];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNumber({ ...number, [name]: value });
  };

  const partialHours = () => {};
  const totalHours = () => {};

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
            <input
              id={'monday'}
              register={register}
              type="number"
              error={errors.monday?.message}
              onChange={handleInput}
              name="one"
              value={number.one}
            />
            <input
              id={'tuesday'}
              register={register}
              type="number"
              onChange={handleInput}
              name="two"
              value={number.two}
            />
            <input
              id={'wednesday'}
              register={register}
              type="number"
              error={errors.wednesday?.message}
              onChange={handleInput}
              name="three"
              value={number.three}
            />
            <input
              id={'thursday'}
              register={register}
              type="number"
              error={errors.thursday?.message}
              onChange={handleInput}
              name="four"
              value={number.four}
            />
            <input
              id={'friday'}
              register={register}
              type="number"
              error={errors.friday?.message}
              onChange={handleInput}
              name="five"
              value={number.five}
            />
            <input
              id={'saturday'}
              register={register}
              type="number"
              error={errors.saturday?.message}
              onChange={handleInput}
              name="six"
              value={number.six}
            />
            <input
              id={'sunday'}
              register={register}
              type="number"
              error={errors.sunday?.message}
              onChange={handleInput}
              name="seven"
              value={number.seven}
            />
            <input readOnly value={add} />
          </form>
          <div>
            {/* <Link to={'employees/form'} className={styles.LinkReset}> */}
            <Button classes="block">Confirm</Button>
            {/* </Link> */}
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
