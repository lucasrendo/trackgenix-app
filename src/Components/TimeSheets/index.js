import React, { useState, useEffect } from 'react';
import List from '../Shared/List/List';
import Form from '../Shared/Form/Form';
import Loading from '../Shared/Loading/Loading';
import Modal from '../Modal/Modal';
import styles from './index.module.css';

function TimeSheets(props) {
  const [timeSheetsList, setTimeSheets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showedScreen, setShowedScreen] = useState();
  const [method, setMethod] = useState('POST');
  const [timeSheetId, setTimesheetId] = useState('');
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState([true]);
  const resource = 'timesheets';

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

  const fetchTimeSheet = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${resource}`);
      const jsonResponse = await response.json();
      setTimeSheets(jsonResponse.data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(async () => {
    fetchTimeSheet();
    formatDataOptions();
  }, []);

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

  const deleteItem = (id) => {
    setTimeSheets([...timeSheetsList.filter((timeSheet) => timeSheet._id !== id)]);
  };

  const editTimeSheet = (id) => {
    setMethod('PUT');
    setShowedScreen(true);
    setTimesheetId(id);
    const closeModal = () => {
      setModal(false);
    };
  };

  const closeModal = () => {
    setModal(false);
  };

  const formatListData = (responseData) => {
    const data = responseData.map((timeSheet) => {
      return {
        id: timeSheet._id,
        date: timeSheet.date.slice(0, 10),
        employee: timeSheet.employee
          ? timeSheet.employee.firstName + ' ' + timeSheet.employee.lastName
          : '',
        project: timeSheet.project ? timeSheet.project.projectName : '',
        role: timeSheet.role,
        task: timeSheet.task ? timeSheet.task.title : ''
      };
    });
    return data;
  };

  const headers = [
    { header: 'Date', key: 'date' },
    { header: 'Employee', key: 'employee' },
    { header: 'Project', key: 'project' },
    { header: 'Role', key: 'role' },
    { header: 'Task', key: 'task' }
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <Modal message={'Time sheet deleted'} show={modal} close={closeModal} />
      {showedScreen ? (
        <Form data={data} props={props} />
      ) : (
        <List
          data={formatListData(timeSheetsList)}
          headers={headers}
          resource={resource}
          deleteItem={deleteItem}
          editItem={editTimeSheet}
          method={method}
        />
      )}
      <div>
        <button onClick={() => setShowedScreen(false)}>Timesheet list</button>
        <button onClick={() => setShowedScreen(true)}>Add new Timesheet</button>
      </div>
    </section>
  );
}

export default TimeSheets;
