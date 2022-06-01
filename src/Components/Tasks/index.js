import { useState, useEffect } from 'react';
import styles from './tasks.module.css';
import Form from './Form/Form';
import List from './List/list';

function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const [screen, changeScreen] = useState(false);
  const [formMethod, setMethod] = useState('POST');
  const [updTaskId, setId] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:4000/tasks`);
      const data = await response.json();
      // eslint-disable-next-line no-console
      setTasksList(data.data);
    } catch (error) {
      alert(error);
    }
  }, []);

  const editTask = (id) => {
    setMethod('PUT');
    changeScreen(true);
    setId(id);
  };

  const deleteItem = (_id) => {
    setTasksList([...tasksList.filter((task) => task._id !== _id)]);
    window.alert('Task successfully deleted');
  };

  const addTask = ({ employee, project, title, description, date, done }) => {
    const newItem = {
      _id: Math.floor(Math.random() * 1000),
      employee,
      project,
      title,
      description,
      date,
      done
    };
    setTasksList([...tasksList, newItem]);
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div>
        <button onMouseDown={() => changeScreen(false)} className={styles.btn}>
          List of Tasks
        </button>
        <button onMouseDown={() => changeScreen(true)} className={styles.btn}>
          Create Task
        </button>
      </div>
      {screen ? (
        // <Form formMethod={formMethod} setMethod={setMethod} id={updTaskId} />
        <Form addTask={addTask} />
      ) : (
        <List
          list={tasksList}
          setList={setTasksList}
          deleteItem={deleteItem}
          setMethod={'GET'}
          editTask={() => editTask()}
          setId={() => setId()}
        />
      )}
    </section>
  );
}

export default Tasks;
