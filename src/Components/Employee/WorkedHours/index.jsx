import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';
import Button from 'Components/Shared/Button';
import { getTimesheetsByEmployee } from 'redux/employee/thunks';
import { getSingleEmployee } from 'redux/employees/thunks';
import { set, useForm } from 'react-hook-form';
import { resetMessage } from 'redux/employees/actions.js';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';
import { Link } from 'react-router-dom';
import {
  endOfWeekWithOptions,
  startOfWeekWithOptions,
  format,
  add,
  sub,
  eachDayOfInterval
} from 'date-fns/esm/fp';
import { isWithinInterval } from 'date-fns';

const HoursForm = () => {
  const id = '62b1122165165c996de858ec';
  const todayDate = new Date();
  const [startWeekDay, setStartWeekDay] = useState();
  const [endWeekDay, setEndWeekDay] = useState();
  const [week, setWeek] = useState({});
  const [listData, setListData] = useState([]);
  const [daysOfWeek, setDaysofWeek] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const timesheetsList = useSelector((state) => state.employeeTimesheets.list);
  const isLoading = useSelector((state) => state.timesheet.isLoading);
  const employee = useSelector((state) => state.employees.employee);
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
    if (id) {
      dispatch(getSingleEmployee(id));
      dispatch(getTimesheetsByEmployee(id));
      getCurrentWeek(todayDate);
    }
  }, []);

  useEffect(() => {
    formatListData(employee?.assignedProjects || [], timesheetsList, daysOfWeek);
  }, [week]);

  const formatListData = (projects, filteredTimesheets, daysOfWeek) => {
    const formatedWeek = formatDaysOfWeek(daysOfWeek);
    const dataList = projects.map((project) => {
      let role = '';
      for (let i = 0; i < project.employees.length; i++) {
        if (project.employees[i].employeeId === id) {
          role = project.employees[i].role;
        }
      }
      let weekTimesheets = [0, 0, 0, 0, 0, 0, 0];
      filteredTimesheets.forEach((timesheet) => {
        if (timesheet.project?._id === project._id) {
          const timesheetDate = format('dd/MM/yyyy', new Date(timesheet.date));
          for (let i = 0; i < formatedWeek.length; i++) {
            if (timesheetDate === formatedWeek[i]) {
              weekTimesheets[i] = timesheet.workedHours;
            }
          }
        }
      });
      return {
        id: project._id,
        projectName: project.projectName,
        role: role,
        monday: weekTimesheets[0],
        tuesday: weekTimesheets[1],
        wednesday: weekTimesheets[2],
        thursday: weekTimesheets[3],
        friday: weekTimesheets[4],
        saturday: weekTimesheets[5],
        sunday: weekTimesheets[6]
      };
    });
    setListData(dataList);
  };

  const getCurrentWeek = (todayDate) => {
    const startofWeek = startOfWeekWithOptions({ weekStartsOn: 1 }, todayDate);
    const endofWeek = endOfWeekWithOptions({ weekStartsOn: 1 }, todayDate);
    setStartWeekDay(startofWeek);
    setEndWeekDay(endofWeek);
    setDaysofWeek(eachDayOfInterval({ start: startofWeek, end: endofWeek }));
    const formatedStart = format('dd/MM/yyyy', startofWeek);
    const formatedEnd = format('dd/MM/yyyy', endofWeek);
    setWeek({
      startDate: formatedStart,
      endDate: formatedEnd
    });
  };

  const nextWeek = (start, end) => {
    const newStartDate = add({ days: 7 }, start);
    const newEndDate = add({ days: 7 }, end);
    setStartWeekDay(newStartDate);
    setEndWeekDay(newEndDate);
    setDaysofWeek(eachDayOfInterval({ start: newStartDate, end: newEndDate }));
    const formatedStart = format('dd/MM/yyyy', newStartDate);
    const formatedEnd = format('dd/MM/yyyy', newEndDate);
    setWeek({
      startDate: formatedStart,
      endDate: formatedEnd
    });
  };

  const prevWeek = (start, end) => {
    const newStartDate = sub({ days: 7 }, start);
    const newEndDate = sub({ days: 7 }, end);
    setStartWeekDay(newStartDate);
    setEndWeekDay(newEndDate);
    setDaysofWeek(eachDayOfInterval({ start: newStartDate, end: newEndDate }));
    const formatedStart = format('dd/MM/yyyy', newStartDate);
    const formatedEnd = format('dd/MM/yyyy', newEndDate);
    setWeek({
      startDate: formatedStart,
      endDate: formatedEnd
    });
  };

  const formatDaysOfWeek = (days) => {
    const formatedWeek = days.map((date) => {
      return format('dd/MM/yyyy', date);
    });
    return formatedWeek;
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
    { header: 'Sunday', key: 'sunday' }
  ];

  return (
    <section className={styles.container}>
      <h2>Worked Hours</h2>
      <div className={styles.topContainer}>
        <Button onClick={() => prevWeek(startWeekDay, endWeekDay)}>{'<'}</Button>
        <p>
          {week?.startDate} - {week?.endDate}
        </p>
        <Button onClick={() => nextWeek(startWeekDay, endWeekDay)}>{'>'}</Button>
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
                  <th className={styles.th}>Total hours</th>
                </tr>
              </thead>
              <tbody>
                {listData.map((row) => {
                  return (
                    <tr key={row.id} className={styles.rows}>
                      {headers.map((header, index) => {
                        return (
                          <td key={index} className={styles.td}>
                            {row[header.key]}
                          </td>
                        );
                      })}
                      <td className={styles.td}>0</td>
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
        </>
      )}
      {/* <Modal isOpen={showModal} isConfirmation={false} handleClose={() => closeHandler()}>
        <h2>{message}</h2>
      </Modal> */}
    </section>
  );
};

export default HoursForm;
