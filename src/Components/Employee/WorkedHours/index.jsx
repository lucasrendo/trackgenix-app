import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';
import Button from 'Components/Shared/Button';
import { getTimesheetsByEmployee } from 'redux/employee/thunks';
import { set, useForm } from 'react-hook-form';
import { resetMessage } from 'redux/employees/actions.js';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';
import { Link } from 'react-router-dom';
import { endOfWeekWithOptions, startOfWeekWithOptions, format } from 'date-fns/esm/fp';

const HoursForm = () => {
  const id = '62b1122165165c996de858ec';
  const todayDate = new Date();
  const [week, setWeek] = useState({});
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const timesheetsList = useSelector((state) => state.employeeTimesheets.list);
  const isLoading = useSelector((state) => state.timesheet.isLoading);
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
    monday: Joi.number().min(0).max(12).required(),
    tuesday: Joi.number().min(0).max(12).required(),
    wednesday: Joi.number().min(0).max(12).required(),
    thursday: Joi.number().min(0).max(12).required(),
    friday: Joi.number().min(0).max(12).required(),
    saturday: Joi.number().min(0).max(12).required(),
    sunday: Joi.number().min(0).max(12).required(),
    weekend: Joi.date().required().max(Date.now())
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(validationSchema),
    defaultValues: { one: '', two: '', three: '', four: '', five: '', six: '', seven: '' }
  });

  useEffect(() => {
    id && dispatch(getTimesheetsByEmployee(id));
    getCurrentWeek(todayDate);
  }, []);

  const formatData = (filteredTimesheets) => {
    const data = filteredTimesheets.map((timesheet) => {
      return {
        id: timesheet._id,
        projectName: timesheet.project?.projectName,
        role: timesheet.role,
        task: timesheet.task?.description,
        workedHours: timesheet.workedHours
      };
    });
    return data;
  };

  // const addDaytoDate = (date) => {
  //   if (date <= todayDate) {
  //     let newDate = new Date(date);
  //     newDate.setDate(newDate.getDate() + 1);
  //     setCurrentDate(newDate);
  //   }
  // };

  // const subtractDaytoDate = (date) => {
  //   let newDate = new Date(date);
  //   newDate.setDate(newDate.getDate() - 1);
  //   setCurrentDate(newDate);
  // };

  // const formatDates = (filteredTimesheets) => {
  //   const dates = filteredTimesheets.map((timesheet) => {
  //     let timesheetDate = new Date(timesheet.date);
  //     startOfWeek(timesheetDate, { weekStartsOn: 1 });
  //     endOfWeek(timesheetDate, { weekStartsOn: 1 });
  //     console.log(startOfWeek, endOfWeek);
  //     return {
  //       startDate: startOfWeek,
  //       endDate: endOfWeek
  //     };
  //   });
  //   return dates;
  // };

  const getCurrentWeek = (todayDate) => {
    const startofWeek = startOfWeekWithOptions({ weekStartsOn: 1 }, todayDate);
    const endofWeek = endOfWeekWithOptions({ weekStartsOn: 1 }, todayDate);
    const formatedStart = format('dd/MM/yyyy', startofWeek);
    const formatedEnd = format('dd/MM/yyyy', endofWeek);
    setWeek({
      startDate: formatedStart,
      endDate: formatedEnd
    });
  };

  const submitHandler = async (data) => {
    if (data) setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
  };

  const handleInput = (data) => {
    const { name, value } = data.target;
    setNumber({ ...number, [name]: value });
  };

  const headers = [
    { header: 'Project Name', key: 'projectName' },
    { header: 'Role', key: 'role' },
    { header: 'Task', key: 'task' },
    { header: 'Worked Hours', key: 'workedHours' }
  ];

  return (
    <section className={styles.container}>
      <h2>Worked Hours</h2>
      <div className={styles.topContainer}>
        <Button>{'<'}</Button>
        <p>
          {week?.startDate} - {week?.endDate}
        </p>
        <Button>{'>'}</Button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <table>
              <thead>
                <tr className={styles.headerRow}>
                  {headers.map((header, index) => {
                    return (
                      <th key={index} className={styles.th}>
                        {header.header}
                      </th>
                    );
                  })}
                  <th className={styles.th}>Add timesheet</th>
                </tr>
              </thead>
              <tbody>
                {formatData(timesheetsList).map((row) => {
                  return (
                    <tr key={row.id} className={styles.rows}>
                      {headers.map((header, index) => {
                        return (
                          <td key={index} className={styles.td}>
                            {row[header.key]}
                          </td>
                        );
                      })}
                      <td className={styles.td}>
                        <Button classes="edit" _id={row.id}>
                          +
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
            <div>
              <h4>{formatData(timesheetsList)[0]?.projectName || ''}</h4>
            </div>
            <input
              type={'number'}
              error={errors.monday}
              onChange={handleInput}
              name="one"
              value={number.one}
            />
            <input
              type={'number'}
              error={errors.tuesday}
              onChange={handleInput}
              name="two"
              value={number.two}
            />
            <input
              type={'number'}
              error={errors.wednesday}
              onChange={handleInput}
              name="three"
              value={number.three}
            />
            <input
              type={'number'}
              error={errors.thursday}
              onChange={handleInput}
              name="four"
              value={number.four}
            />
            <input
              type={'number'}
              error={errors.friday}
              onChange={handleInput}
              name="five"
              value={number.five}
            />
            <input
              type={'number'}
              error={errors.saturday}
              onChange={handleInput}
              name="six"
              value={number.six}
            />
            <input
              type={'number'}
              error={errors.sunday}
              onChange={handleInput}
              name="seven"
              value={number.seven}
            />
            <input readOnly value={add} />
          </form> */}
          <div>
            <Button classes="block">Add new timesheet</Button>
          </div>
        </>
      )}
      {/* <Modal isOpen={showModal} isConfirmation={false} handleClose={() => closeHandler()}>
        <h2>{message}</h2>
      </Modal> */}
    </section>
  );
};

export default HoursForm;
