// import { useState } from 'react';
import styles from './tasks.module.css';
import Form from './form/Form';
// import List from './list';

function Tasks() {
  // const [screen, showScreen] = useState(<List />);

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      {/* <div>
        <button onMouseDown={() => showScreen(<List />)} style={styles.btn}>
          List of Tasks
        </button>
        <button onMouseDown={() => showScreen(<Form />)} style={styles.btn}>
          Create/update Task
        </button>
      </div>
      {screen} */}
      <Form />
    </section>
  );
}

export default Tasks;
