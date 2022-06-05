import React, { useState, useEffect } from 'react';
import TimeSheetList from './List/time-sheet-list';
import Form from '../Shared/Form/Form';
import Modal from './Modal/Modal';
import styles from './time-sheets.module.css';

const TimeSheets = (props) => {
  const [timeSheetsList, saveTimeSheets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showedScreen, setShowedScreen] = useState();
  const [modal, setModal] = useState(false);

  const data = [
    {
      title: 'Employee',
      type: 'select',
      id: 'employee',
      options: employees,
      required: true
    },
    {
      title: 'Project',
      type: 'select',
      id: 'project',
      options: projects,
      required: true
    },
    {
      title: 'Role',
      type: 'text',
      id: 'role',
      required: true
    },
    {
      title: 'Date',
      type: 'date',
      id: 'date',
      required: true
    },
    {
      title: 'Rate',
      type: 'number',
      id: 'rate',
      required: true
    },
    {
      title: 'Worked Hours',
      type: 'number',
      id: 'workedHours',
      required: true
    },
    {
      title: 'Description',
      type: 'text',
      id: 'description'
    },
    {
      title: 'Tasks',
      type: 'select',
      id: 'task',
      options: tasks
    }
  ];

  useEffect(() => {
    getTimesheets();
    formatDataOptions();
  }, []);

  const getTimesheets = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`);
      const jsonResponse = await response.json();
      saveTimeSheets(jsonResponse.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const formatDataOptions = async () => {
    const rawProjects = await getProjects();
    const rawEmployees = await getEmployees();
    const rawTasks = await getTasks();
    let projectsData = [];
    let employeesData = [];
    let tasksData = [];
    rawProjects.forEach((project, index) => {
      projectsData.push({ id: project._id });
      projectsData[index].text = project.projectName;
    });
    rawEmployees.forEach((employee, index) => {
      employeesData.push({ id: employee._id });
      employeesData[index].text = `${employee.firstName} ${employee.lastName}`;
    });
    rawTasks.forEach((task, index) => {
      tasksData.push({ id: task._id });
      tasksData[index].text = task.title;
    });
    setProjects(projectsData);
    setEmployees(employeesData);
    setTasks(tasksData);
  };

  const deleteItem = (_id) => {
    saveTimeSheets([...timeSheetsList.filter((timeSheet) => timeSheet._id !== _id)]);
  };

  const editTimeSheet = (id) => {
    setShowedScreen(true);
    const closeModal = () => {
      setModal(false);
    };
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <Modal message={'Time sheet deleted'} show={modal} close={closeModal} />
      {showedScreen ? (
        <Form data={data} props={props} />
      ) : (
        <TimeSheetList
          list={timeSheetsList}
          setlist={saveTimeSheets}
          deleteItem={deleteItem}
          editTimeSheet={editTimeSheet}
          setModal={setModal}
          data={data}
        />
      )}
      <div>
        <button onClick={() => setShowedScreen(false)}>Timesheet list</button>
        <button onClick={() => setShowedScreen(true)}>Add new Timesheet</button>
      </div>
    </section>
  );
};

export default TimeSheets;
