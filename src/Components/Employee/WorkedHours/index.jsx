import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';
import Button from 'Components/Shared/Button';
import { getTimesheetsByEmployee } from 'redux/employee/thunks';
import { useForm } from 'react-hook-form';
import { resetMessage } from 'redux/employees/actions.js';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';
import { Link } from 'react-router-dom';

const HoursForm = () => {
  const id = '62b1122165165c996de858ec';
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

  const formatData = (filteredTimesheets) => {
    const data = filteredTimesheets.map((timesheet) => {
      return {
        id: timesheet._id,
        projectName: timesheet.project?.projectName,
        role: timesheet.role,
        monday: 'Monday Timesheet',
        tuesday: 'Tuesday Timesheet',
        wednesday: 'Wednesday Timesheet',
        thursday: 'Thursday Timesheet',
        friday: 'Friday Timesheet',
        weekHours: 'Week hours'
      };
    });
    return data;
  };

  const getTodayDate = () => {
    let currentDate = new Date();
    let day = currentDate.getDate().toString();
    if (day < 10) {
      day = '0' + day;
    }
    let month = currentDate.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    month = month.toString();
    let year = currentDate.getFullYear().toString();
    let maxValue = day + '-' + month + '-' + year;
    return maxValue;
  };

  const formatDates = (filteredTimesheets) => {
    const dates = filteredTimesheets.map((timesheet) => {
      let startDate = new Date(timesheet.date);
      let day = startDate.getDate().toString();
      if (day < 10) {
        day = '0' + day;
      }
      let month = startDate.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      month = month.toString();
      let year = startDate.getFullYear().toString();
      let startDateValue = day + '-' + month + '-' + year;
      return {
        startDate: startDateValue,
        endDate: getTodayDate()
      };
    });
    return dates;
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
    { header: 'Monday', key: 'monday' },
    { header: 'Tuesday', key: 'tuesday' },
    { header: 'Wednesday', key: 'wednesday' },
    { header: 'Thursday', key: 'thursday' },
    { header: 'Friday', key: 'friday' },
    { header: 'Saturday', key: 'saturday' },
    { header: 'Sunday', key: 'sunday' },
    { header: 'Total', key: 'total' }
  ];

  return (
    <section className={styles.container}>
      <h2>Worked Hours</h2>
      <div className={styles.topContainer}>
        <Button>Before</Button>
        <p>
          {formatDates(timesheetsList)[0]?.startDate} - {formatDates(timesheetsList)[0]?.endDate}
        </p>
        <Button>Next</Button>
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
            <Button classes="block">Confirm</Button>
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
