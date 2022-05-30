import styles from '../tasks.module.css';

const Sent = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h3>Task successfully Sent</h3>
      <p className={styles.data}>Employee ID: {data.employeeId ? data.employeeId : '<Empty>'}</p>
      <p className={styles.data}>Project ID: {data.projectId ? data.projectId : '<Empty>'}</p>
      <p className={styles.data}>Title: {data.title ? data.title : '<Empty>'}</p>
      <p className={styles.data}>Description: {data.description ? data.description : '<Empty>'}</p>
      <p className={styles.data}>Date: {data.date ? data.date : '<Empty>'}</p>
      <p className={styles.data}>Done: {data.done ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Sent;
