import { useState, useEffect } from 'react';

//import styles from './form';

const TimeSheetForm = () => {
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

  const onChangeDataInput = (e) => {
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

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const employees = await response.json();
      for (let i = 0; i < employees.data.length; i++) {
        setEmployeeOptions((employeeOptions) => [
          ...employeeOptions,
          {
            value: `${employees.data[i]._id}`,
            label: `${employees.data[i].firstName} ${employees.data[i].lastName}`
          }
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const projects = await response.json();
      for (let i = 0; i < projects.data.length; i++) {
        setProjectOptions((projectOptions) => [
          ...projectOptions,
          {
            value: `${projects.data[i]._id}`,
            label: `${projects.data[i].projectName} `
          }
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const tasks = await response.json();
      for (let i = 0; i < tasks.data.length; i++) {
        setTasksOptions((tasksOptions) => [
          ...tasksOptions,
          {
            value: `${tasks.data[i]._id}`,
            label: `${tasks.data[i].description}`
          }
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const timeSheetId = params.get('id');

    let url = `${process.env.REACT_APP_API_URL}/time-sheets/`;
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
        workedHour: workedHours,
        description: timeSheetDescription,
        tasks: task
      })
    };
    if (timeSheetId) {
      options.method = 'PUT';
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/time-sheets/${timeSheetId}`,
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div>
        <h2>Timesheet form</h2>
        <form>
          <select
            onChange={onChangeEmployeeIdInput}
            value={employeeId}
            type="text"
            id="employeeId"
            name="employeeId"
            required
          >
            <option>Select an employee</option>
            {employeeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </form>
      </div>
    </section>
  );
};

export default TimeSheetForm;
