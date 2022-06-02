import { useState, useEffect } from 'react';
import styles from '../tasks.module.css';
import Sent from './Sent';

const Form = ({ formMethod, back, id }) => {
  // LISTEN FOR USER INPUT
  const [employeeId, setEmployeeId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [done, setDone] = useState(false);
  // LISTEN FOR FETCH RESPONSE
  const [newTask, setTask] = useState(undefined);
  const [status, setStatus] = useState(true);
  const [employees, setEmployeesList] = useState([]);
  const [projects, setProjectsList] = useState([]);

  // ===== FETCH DATA ===== //

  const createTask = async (task) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(task)
      });
      const body = await res.json();
      alert(`${body.message}`);
      setStatus(body.error);
      setTask(body.data);
      return body;
    } catch (error) {
      alert(error);
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(task)
      });
      const body = await res.json();
      alert(body.message);
      setStatus(body.error);
    } catch (error) {
      alert(error);
    }
  };

  const getTask = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      alert(error);
    }
  };

  const getProjects = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const body = await res.json();
      setProjectsList(body.data);
    } catch (error) {
      alert(error);
    }
  };

  const getEmployees = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const body = await res.json();
      setEmployeesList(body.data);
    } catch (error) {
      alert(error);
    }
  };

  // ===== FILL UPDATE FORM WITH RECEIVED TASK ===== /

  const fillInputs = async () => {
    const updTask = await getTask();
    updTask.employeeId === null ? setEmployeeId(null) : setEmployeeId(updTask.employeeId._id);
    updTask.projectId === null ? setProjectId(null) : setProjectId(updTask.projectId._id);
    setTitle(updTask.title);
    setDescription(updTask.description);
    setDate(updTask.date.substring(0, 10));
    setDone(updTask.done);
  };

  useEffect(async () => {
    await getProjects();
    await getEmployees();
    if (formMethod === 'PUT') fillInputs();
  }, []);

  // ===== RESET THE FORM IF CHANGE FROM UPDATE TO POST OR VICEVERSA ===== /
  useEffect(async () => {
    setEmployeeId('');
    setProjectId('');
    setTitle('');
    setDescription('');
    setDate('');
    setDone(false);
    setTask(undefined);
    setStatus(true);
  }, [formMethod]);

  // ===== HANDLE SUBMIT ===== //

  const submitHandler = async (e) => {
    e.preventDefault();

    if (formMethod === 'PUT') {
      await updateTask({
        employeeId: employeeId,
        projectId: projectId,
        title: title,
        description: description,
        date: date,
        done: done
      });
    }
    if (formMethod === 'POST') {
      if (projectId === '' || title === '') return alert('title and project are required');
      await createTask({
        employeeId: employeeId,
        projectId: projectId,
        title: title,
        description: description,
        date: date,
        done: done
      });
    }

    if (!status) {
      setEmployeeId('');
      setProjectId('');
      setTitle('');
      setDescription('');
      setDate('');
      setDone(false);
      setStatus(true);
      if (formMethod === 'PUT') back();
    }
  };

  return (
    <>
      <form
        className={styles.taskForm}
        onSubmit={submitHandler}
        onChange={() => setTask(undefined)}
      >
        {formMethod === 'PUT' && (
          <div className={styles.inputContainer}>
            <label>Task ID</label>
            <input type="text" value={id} readOnly className={styles.readOnly} />
          </div>
        )}
        <div className={styles.inputContainer}>
          <label htmlFor="employee-id">Employee</label>
          <select
            id="employee-id"
            name="employee-id"
            value={employeeId}
            className={styles.select}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          >
            <option disabled value="">
              - Select an Employee -
            </option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {`${employee.firstName} ${employee.lastName}`}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="project-id">Project</label>
          <select
            id="project-id"
            name="project-id"
            value={projectId}
            className={styles.select}
            onChange={(e) => setProjectId(e.target.value)}
            required
          >
            <option disabled value="">
              - Select a Project -
            </option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Insert task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Insert task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className={`${styles.inputContainer} ${styles.check}`}>
          <input
            type="checkbox"
            id="done-checkbox"
            checked={done}
            value={done}
            onChange={() => setDone(!done)}
          />
          <label htmlFor="done-checkbox">Done</label>
        </div>
        <input
          type="submit"
          className={`${styles.btn} ${styles.btnBlock}`}
          value={formMethod === 'POST' ? 'Add Task' : 'Update Task'}
        />
      </form>
      {newTask && <Sent data={newTask} formMethod={formMethod} />}
    </>
  );
};

export default Form;
