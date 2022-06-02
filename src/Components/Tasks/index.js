import { useState, useEffect } from 'react';
import styles from './tasks.module.css';
import Form from './form/Form';
import List from './List/list';

function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const [screen, changeScreen] = useState(false);
  const [formMethod, setMethod] = useState('POST');
  const [updTaskId, setId] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      setTasksList(data.data);
    } catch (error) {
      alert(error);
    }
  }, [formMethod]);

  const editTask = (id) => {
    setMethod('PUT');
    changeScreen(true);
    setId(id);
  };

  const deleteItem = (_id) => {
    setTasksList([...tasksList.filter((task) => task._id !== _id)]);
    window.alert('Task successfully deleted');
  };

  const backToList = () => {
    setMethod('GET');
    changeScreen(false);
    alert('Successfully updated!');
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div>
        <button
          onMouseDown={() => {
            changeScreen(false);
            setMethod('GET');
          }}
          className={styles.btn}
        >
          List of Tasks
        </button>
        <button
          onMouseDown={() => {
            changeScreen(true);
            setMethod('POST');
          }}
          className={styles.btn}
        >
          Create Task
        </button>
      </div>
      {screen ? (
        <Form formMethod={formMethod} back={() => backToList()} id={updTaskId} />
      ) : (
        <List
          list={tasksList}
          setList={setTasksList}
          deleteItem={deleteItem}
          editTask={(id) => editTask(id)}
        />
      )}
    </section>
  );
}

export default Tasks;
