import Styles from './EmployeesForm.module.css';

const Form = () => {
  <form className={Styles.employeesForm}>
    <div>
      <label>First Name</label>
      <input type="text" placeholder="Insert Employee Name" />
    </div>
    <div>
      <label>Last Name</label>
      <input type="text" placeholder="Insert Employee Last Name" />
    </div>
    <div>
      <label>Email</label>
      <input type="text" placeholder="Insert Employee Email" />
    </div>
    <div>
      <label>Password</label>
      <input type="password" placeholder="Insert Password" />
    </div>
    <div>
      <label>Assigned Projects</label>
      <input type="text" placeholder="Insert Employee Assigned Projects" />
    </div>
    <input type="submit" value="Add Employee" />
  </form>;
};

export default Form;
