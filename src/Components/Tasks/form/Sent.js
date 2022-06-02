import styles from '../tasks.module.css';

const Sent = ({ data, formMethod }) => {
  return (
    <div>
      <h3>Task successfully {formMethod === 'PUT' ? 'Updated' : 'Created'}</h3>
      <p className={styles.data}>Task ID: {data._id}</p>
      <p className={styles.data}>
        Employee:{' '}
        {!data.employeeId
          ? '<Empty>'
          : data.employeeId.firstName
          ? `${data.employeeId.firstName} ${data.employeeId.lastName}`
          : data.employeeId}
      </p>
      <p className={styles.data}>
        Project:{' '}
        {!data.projectId
          ? '<Empty>'
          : data.projectId.firstName
          ? `${data.projectId.firstName} ${data.projectId.lastName}`
          : data.projectId}
      </p>
      <p className={styles.data}>Title: {data.title}</p>
      <p className={styles.data}>Description: {data.description ? data.description : '<Empty>'}</p>
      <p className={styles.data}>Date: {data.date ? data.date.substring(0, 10) : '<Empty>'}</p>
      <p className={styles.data}>Done: {data.done ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Sent;
