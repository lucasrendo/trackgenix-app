import styles from '../tasks.module.css';

const Sent = ({ data, formMethod }) => {
  return (
    <div>
      <h3>Task successfully {formMethod === 'PUT' ? 'Updated' : 'Created'}</h3>
      <p className={styles.data}>Task ID: {data._id}</p>
      <p className={styles.data}>
        Employee:{' '}
        {data.employeeId ? `${data.employeeId.firstName} ${data.employeeId.lastName}` : '<Empty>'}
      </p>
      <p className={styles.data}>
        Project: {data.projectId ? data.projectId.projectName : '<Empty>'}
      </p>
      <p className={styles.data}>Title: {data.title}</p>
      <p className={styles.data}>Description: {data.description ? data.description : '<Empty>'}</p>
      <p className={styles.data}>Date: {data.date ? data.date : '<Empty>'}</p>
      <p className={styles.data}>Done: {data.done ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Sent;
