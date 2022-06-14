import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../../redux/employees/thunks';
import List from '../../Shared/List/List';
import Button from '../../Shared/Button/Button';
import Loading from '../../Shared/Loading/Loading';
import styles from './employees.module.css';

const Employees = () => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.list);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const resource = '/employees';

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const formatListData = (responseData) => {
    const data = responseData.map((employee) => {
      return {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        dni: employee.dni,
        email: employee.email,
        password: employee.password,
        isActive: employee.isActive.toString()
      };
    });
    return data;
  };

  const headers = [
    { header: 'First Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Mail', key: 'email' },
    { header: 'Active', key: 'isActive' }
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>Employees</h2>
      <List data={formatListData(employee)} headers={headers} resource={resource} />
      <div>
        <Link to={'employees/form'} className={styles.LinkReset}>
          <Button classes="block">Create Employee</Button>
        </Link>
      </div>
    </section>
  );
};

export default Employees;
