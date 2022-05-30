import { useState } from 'react';
import styles from '../tasks.module.css';
import Sent from './Sent';

const Form = () => {
  // Inputs
  const [id, setId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [done, setDone] = useState(false);
  // Fetch confirmation
  const [newTask, setTask] = useState(undefined);
  // Toggle PUT or POST form
  const [formMethod, setMethod] = useState('POST');

  let change = false;

  const submitHandler = (e) => {
    e.preventDefault();

    if (formMethod === 'PUT' && id === '') return alert('task ID is required');
    if (formMethod === 'POST' && (projectId === '' || title === '')) {
      return alert('title and project are required');
    }

    if (formMethod === 'POST') {
      setTask({
        employeeId: employeeId,
        projectId: projectId,
        title: title,
        description: description,
        date: date,
        done: done
      });
    }
    if (formMethod === 'PUT') {
      const receivedTask = {};
      employeeId !== '' && (receivedTask.employeeId = employeeId);
      projectId !== '' && (receivedTask.projectId = projectId);
      title !== '' && (receivedTask.title = title);
      description !== '' && (receivedTask.description = description);
      date !== '' && (receivedTask.date = date);
      change && (receivedTask.done = done);
      setTask(receivedTask);
    }

    setId('');
    setEmployeeId('');
    setProjectId('');
    setTitle('');
    setDescription('');
    setDate('');
    setDone('');
  };

  return (
    <>
      <div>
        <button
          className={styles.btn}
          onMouseDown={() => {
            setMethod('POST');
            setTask(undefined);
          }}
        >
          Create Task
        </button>
        <button
          className={styles.btn}
          onMouseDown={() => {
            setMethod('PUT');
            setTask(undefined);
          }}
        >
          Edit Task
        </button>
      </div>
      <form className={styles.taskForm} onSubmit={submitHandler} onFocus={() => setTask(undefined)}>
        {formMethod === 'PUT' && (
          <div className={styles.inputContainer}>
            <label htmlFor="task-id">Task ID</label>
            <input
              type="text"
              id="task-id"
              placeholder="Insert task ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        )}
        <div className={styles.inputContainer}>
          <label htmlFor="employee-id">Employee</label>
          <input
            type="text"
            id="employee-id"
            placeholder="Insert employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="project-id">Project</label>
          <input
            type="text"
            id="project-id"
            placeholder="Insert project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Insert task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={() => {
              setDone(!done);
              change = true;
            }}
          />
          <label htmlFor="done-checkbox">Done</label>
        </div>
        <input
          type="submit"
          className={`${styles.btn} ${styles.btnBlock}`}
          value={formMethod === 'POST' ? 'Add Task' : 'Update Task'}
        />
      </form>
      {newTask && <Sent data={newTask} />}
    </>
  );
};

export default Form;
