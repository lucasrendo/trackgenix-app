import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import { getTimesheetsByEmployee } from 'redux/employee/thunks';
import { getSingleEmployee } from 'redux/employees/thunks';
import { getTasks } from 'redux/tasks/thunks';
import { getSingleProject } from 'redux/projects/thunks';
import { addTimesheet, editTimesheet, getSingleTimesheet } from 'redux/timesheets/thunks';
import { resetMessage, resetTimesheet } from 'redux/timesheets/actions';
import { set, useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  endOfWeekWithOptions,
  startOfWeekWithOptions,
  format,
  add,
  sub,
  eachDayOfInterval
} from 'date-fns/esm/fp';

const timeSheetValidate = Joi.object({
  workedHours: Joi.number().required().label('Worked Hours').messages({
    'string.empty': `Worked Hours cannot be empty`
  }),

  date: Joi.date().required().min('2022-01-01').label('Date').messages({
    'string.empty': `Date cannot be empty`,
    'date.min': `Date cannot be earlier than 2022/01/01`
  }),

  role: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .label('Role')
    .valid('DEV', 'QA', 'PM', 'TL')
    .insensitive()
    .min(2)
    .max(3)
    .required()
    .messages({
      'string.pattern.base': `Role must only have letters`,
      'string.empty': `Role cannot be empty`,
      'string.max': `Role cannot have more than 3 characters`,
      'string.min': `Role must have at least 2 characters`
    }),

  rate: Joi.number().required().label('Rate').messages({
    'string.empty': `Rate cannot be empty`
  }),

  project: Joi.string().label('Project').required().messages({
    'string.empty': `Project cannot be an empty field`
  }),

  employee: Joi.string().label('Employee').required().messages({
    'string.empty': `Employee cannot be an empty field`
  }),

  task: Joi.string().label('Task').messages({
    'string.empty': `Task cannot be an empty field`
  }),

  description: Joi.string().label('Description').min(0).messages({
    'string.empty': `Description cannot be an empty field`
  })
});

const HoursForm = () => {
  const id = '62b1122165165c996de858ec';
  const todayDate = new Date();
  const [startWeekDay, setStartWeekDay] = useState();
  const [endWeekDay, setEndWeekDay] = useState();
  const [week, setWeek] = useState({});
  const [listData, setListData] = useState([]);
  const [daysOfWeek, setDaysofWeek] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const timesheetsList = useSelector((state) => state.employeeTimesheets.list);
  const timesheet = useSelector((state) => state.timesheet.timesheet);
  const tasks = useSelector((state) => state.tasks.list);
  const isLoading = useSelector((state) => state.timesheet.isLoading);
  const error = useSelector((state) => state.timesheet.error);
  const employee = useSelector((state) => state.employees.employee);
  const message = useSelector((state) => state.timesheet.message);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(timeSheetValidate),
    defaultValues: {
      task: '',
      rate: '',
      workedHours: '',
      description: ''
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(getSingleEmployee(id));
      dispatch(getTimesheetsByEmployee(id));
      getCurrentWeek(todayDate);
    }
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    formatListData(employee?.assignedProjects || [], timesheetsList, daysOfWeek);
  }, [week]);

  useEffect(() => {
    reset(timesheet);
  }, [timesheet]);

  const formatListData = (projects, filteredTimesheets, daysOfWeek) => {
    const formatedWeek = formatDaysOfWeek(daysOfWeek);
    let hoursForeachProject = [];
    const dataList = projects.map((project) => {
      const role = getRole(project);
      const weekTimesheets = getWeekTimesheets(filteredTimesheets, project, formatedWeek);
      const totalHours = weekTotalHours(weekTimesheets.workedHours);
      hoursForeachProject.push(totalHours);
      return {
        id: project._id,
        projectName: project.projectName,
        role: role,
        monday: weekTimesheets.workedHours[0],
        tuesday: weekTimesheets.workedHours[1],
        wednesday: weekTimesheets.workedHours[2],
        thursday: weekTimesheets.workedHours[3],
        friday: weekTimesheets.workedHours[4],
        saturday: weekTimesheets.workedHours[5],
        sunday: weekTimesheets.workedHours[6],
        totalHours: totalHours
      };
    });
    setListData(dataList);
    setTotalHours(weekTotalHours(hoursForeachProject));
  };

  const getWeekTimesheets = (filteredTimesheets, project, formatedWeek) => {
    let weekTimesheetsWorkedHours = [0, 0, 0, 0, 0, 0, 0];
    let weekTimesheetsId = [null, null, null, null, null, null, null];
    filteredTimesheets.forEach((timesheet) => {
      if (timesheet.project?._id === project._id) {
        const timesheetDate = format('dd/MM/yyyy', new Date(timesheet.date));
        for (let i = 0; i < formatedWeek.length; i++) {
          if (timesheetDate === formatedWeek[i]) {
            weekTimesheetsWorkedHours[i] = timesheet.workedHours;
            weekTimesheetsId[i] = timesheet._id;
          }
        }
      }
    });
    return { workedHours: weekTimesheetsWorkedHours, timesheets: weekTimesheetsId };
  };

  const getRole = (project) => {
    let role = '';
    for (let i = 0; i < project.employees.length; i++) {
      if (project.employees[i].employeeId === id) {
        role = project.employees[i].role;
      }
    }
    return role;
  };

  const weekTotalHours = (weekTimesheets) => {
    const initialValue = 0;
    const sumWithInitial = weekTimesheets.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    return sumWithInitial;
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

  const formatTasks = () => {
    return tasks.map((task) => {
      return { id: task._id, text: task.title };
    });
  };

  const headers = [
    { header: 'Project Name', key: 'projectName', style: false },
    { header: 'Role', key: 'role', style: false },
    { header: 'Monday', key: 'monday', style: true },
    { header: 'Tuesday', key: 'tuesday', style: true },
    { header: 'Wednesday', key: 'wednesday', style: true },
    { header: 'Thursday', key: 'thursday', style: true },
    { header: 'Friday', key: 'friday', style: true },
    { header: 'Saturday', key: 'saturday', style: true },
    { header: 'Sunday', key: 'sunday', style: true },
    { header: 'Total Hours', key: 'totalHours', style: false }
  ];

  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
    // if (!error) {
    //   goBack();
    // }
  };

  const submitHandler = (data) => {
    if (id) {
      dispatch(editTimesheet(data, id));
    } else {
      dispatch(addTimesheet(data));
    }
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <h2>Worked Hours</h2>
      <div className={styles.topContainer}>
        <Button onClick={() => prevWeek(startWeekDay, endWeekDay)}>{'<'}</Button>
        <p className={styles.weekText}>
          {week?.startDate} - {week?.endDate}
        </p>
        <Button onClick={() => nextWeek(startWeekDay, endWeekDay)}>{'>'}</Button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <table className={styles.table}>
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
              {listData.map((row) => {
                return (
                  <tr key={row.id} className={styles.rows}>
                    {headers.map((header, index) => {
                      return (
                        <td
                          key={index}
                          className={header.style ? styles.timesheetTd : styles.td}
                          onClick={() => setShowModal(true)}
                        >
                          {row[header.key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2 className={styles.totalText}>Total: {totalHours}</h2>
        </>
      )}
      {
        <Modal isOpen={showModal} isConfirmation={true} handleClose={() => closeHandler()}>
          <h2 className={styles.modalText}>Timesheet</h2>
          <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
            <Select
              id={'task'}
              text={'Task'}
              options={formatTasks()}
              register={register}
              error={errors.task}
            />

            <Input
              id={'description'}
              type={'text'}
              text={'Description'}
              required={false}
              register={register}
              error={errors.description}
            />
            <Input
              id={'workedHours'}
              text={'Worked Hours'}
              type={'number'}
              register={register}
              error={errors.workedHours}
            />

            <Input
              id={'rate'}
              text={'Rate'}
              type={'number'}
              register={register}
              error={errors.rate}
            />
          </form>
        </Modal>
      }
    </section>
  );
};

export default HoursForm;
