import styles from './EmployeesForm.module.css';
import Form from './EmployeesForm';

function Employees() {
  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <Form />
    </section>
  );
}
export default Employees;
