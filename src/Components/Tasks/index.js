import { useState, useEffect } from 'react';
import styles from './tasks.module.css';
import Form from './Form/Form';
import List from './List/list';

function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const [screen, changeScreen] = useState(false);
  const [showingList, toggleList] = useState(true);
  const [formMethod, setMethod] = useState('POST');
  const [updTaskId, setId] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      // eslint-disable-next-line no-console
      setTasksList(data.data);
    } catch (error) {
      toggleList(false);
      alert(error);
    }
  }, []);

  const editTask = (id) => {
    setMethod('PUT');
    changeScreen(true);
    setId(id);
  };

  const backToList = () => {
    setMethod('POST');
    changeScreen(false);
    alert('Successfully updated!');
  };

  const deleteItem = (_id) => {
    setTasksList([...tasksList.filter((task) => task._id !== _id)]);
    window.alert('Task successfully deleted');
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div>
        <button onMouseDown={() => changeScreen(false)} className={styles.btn}>
          List of Tasks
        </button>
        <button
          onMouseDown={() => {
            changeScreen(true);
            setMethod('POST');
          }}
          className={styles.btn}
        >
          Create and edit Tasks
        </button>
      </div>
      {screen ? (
        <Form formMethod={formMethod} back={() => backToList()} id={updTaskId} />
      ) : showingList ? (
        <List
          list={tasksList}
          setList={setTasksList}
          deleteItem={deleteItem}
          setMethod={'GET'}
          editTask={() => editTask()}
          setId={() => setId()}
        />
      ) : (
        <h2>There was an error showing the tasks</h2>
      )}
    </section>
  );
}

export default Tasks;
