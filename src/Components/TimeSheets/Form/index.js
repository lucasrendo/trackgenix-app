import { useState, useEffect } from 'react';
import styles from './Form.module.css';

const TimeSheetForm = ({ timeSheetId }) => {
  const [date, setDate] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeRole, setEmployeeRole] = useState('');
  const [workedHours, setWorkedHours] = useState('');
  const [project, setProjectValue] = useState('');
  const [rate, setRateValue] = useState('');
  const [timeSheetDescription, setTimeSheetDescription] = useState('');
  const [task, setTaskValue] = useState('');
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [tasksOptions, setTasksOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [timeSheetModal, setTimeSheetModal] = useState('');
  const [showModal, setShowModal] = useState('');

  const onChangeDateInput = (e) => {
    setDate(e.target.value);
  };

  const onChangeWorkedHoursInput = (e) => {
    setWorkedHours(e.target.value);
  };

  const onChangeEmployeeIdInput = (e) => {
    setEmployeeId(e.target.value);
  };

  const onChangeProjectValueInput = (e) => {
    setProjectValue(e.target.value);
  };

  const onChangeTaskValueInput = (e) => {
    setTaskValue(e.target.value);
  };

  const onChangeRateValueInput = (e) => {
    setRateValue(e.target.value);
  };

  const onChangeDescriptionInput = (e) => {
    setTimeSheetDescription(e.target.value);
  };

  const onChangeEmployeeRole = (e) => {
    setEmployeeRole(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const employeeData = await response.json();
      setEmployeeOptions(employeeData.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const projectData = await response.json();
      setProjectOptions(projectData.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const taskData = await response.json();
      setTasksOptions(taskData.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (timeSheetId) {
      fetch(`${process.env.REACT_APP_API_URL}/timesheets/${timeSheetId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setEmployeeId(response.data.employee._id);
          setProjectValue(response.data.project._id);
          setEmployeeRole(response.data.role);
          setDate(response.data.date.split('T')[0]);
          setRateValue(response.data.rate);
          setWorkedHours(response.data.workedHours);
          setTimeSheetDescription(response.data.description);
          setTaskValue(response.data.task._id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeSheetModal('Timesheet created');
    let url = `${process.env.REACT_APP_API_URL}/timesheets/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        employee: employeeId,
        project: project,
        role: employeeRole,
        date: date,
        rate: rate,
        workedHours: workedHours,
        description: timeSheetDescription,
        task: task
      })
    };
    if (timeSheetId) {
      setTimeSheetModal('Timesheet edited');
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API_URL}/timesheets/${timeSheetId}`;
    }
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.error) {
        setTimeSheetModal('An error has an error');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(true);
    }
  };

  return (
    <div>
      <h2>Timesheet form</h2>
      <form className={styles.container} onSubmit={handleSubmit}>
        <select
          onChange={onChangeEmployeeIdInput}
          value={employeeId}
          type="text"
          id="employeeId"
          name="employeeId"
          required
        >
          <option value="" disabled>
            Select an employee
          </option>
          {employeeOptions.map((employee) => {
            return (
              <option key={employee._id} value={employee._id}>{`${
                employee.firstName + ' ' + employee.lastName
              }`}</option>
            );
          })}
        </select>
        <select
          onChange={onChangeProjectValueInput}
          value={project}
          type="text"
          id="projectId"
          name="projectId"
          required
        >
          <option>Select a project</option>
          {projectOptions.map((project) => (
            <option key={project._id} value={project._id}>
              {project.projectName}
            </option>
          ))}
        </select>
        <select
          onChange={onChangeEmployeeRole}
          value={employeeRole}
          type="text"
          id="employee-role"
          name="employee-role"
          required
        >
          <option>Select a role</option>
          <option value="QA">QA</option>
          <option value="DEV">DEV</option>
          <option value="PM">PM</option>
          <option value="TL">TL</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={onChangeDateInput}
          id="date"
          name="date"
          required
        />
        <input
          type="number"
          value={rate}
          onChange={onChangeRateValueInput}
          id="date"
          name="date"
          placeholder="Enter a rate"
          required
        />
        <input
          type="number"
          value={workedHours}
          onChange={onChangeWorkedHoursInput}
          placeholder="Enter a number of hours"
          required
        />
        <textarea
          type=""
          value={timeSheetDescription}
          onChange={onChangeDescriptionInput}
          id="date"
          name="date"
          placeholder="Enter a description"
          required
        />
        <select
          onChange={onChangeTaskValueInput}
          value={task}
          type="text"
          id="task"
          name="task"
          required
        >
          <option>Select a task</option>
          {tasksOptions.map((task) => (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          ))}
        </select>
        <button type="submit">Save Timesheet</button>
        {showModal && (
          <div id="modal" className={styles.modal}>
            <div className={styles.header}>
              <h3>Trackgenix</h3>
              <span className={styles.close} onClick={closeModal}>
                &times;
              </span>
            </div>
            <p>{timeSheetModal}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default TimeSheetForm;
