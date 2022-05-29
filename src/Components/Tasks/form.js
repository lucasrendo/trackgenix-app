import styles from './tasks.module.css';

const Form = () => {
  return (
    <form className={styles.taskForm}>
      <div className={styles.inputContainer}>
        <label htmlFor="employee-id">Employee</label>
        <input type="text" id="employee-id" placeholder="Insert employee ID" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="project-id">Project</label>
        <input type="text" id="project-id" placeholder="Insert project ID" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Insert task title" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" placeholder="Insert task description" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="date">Date</label>
        <input type="date" id="date" />
      </div>
      <div className={`${styles.inputContainer} ${styles.check}`}>
        <input type="checkbox" id="done-checkbox" />
        <label htmlFor="done-checkbox">Done</label>
      </div>
      <input type="submit" className={`${styles.btn} ${styles.btnBlock}`} value="Add Task" />
    </form>
  );
};

export default Form;
