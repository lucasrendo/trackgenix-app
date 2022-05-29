import styles from './tasks.module.css';
import Form from './form';

function Tasks() {
  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <Form />
    </section>
  );
}

export default Tasks;
