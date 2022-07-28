import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleModal } from 'redux/global/actions';
import { getEmployees } from 'redux/thunks/admin';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal';
import listStyles from 'Components/Shared/List/list.module.css';
import styles from './admin.module.css';

const EmployeesList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.admins.isLoading);
  const employeesList = useSelector((state) => state.employees.list);
  const deletingEmployee = useSelector((state) => state.employees.isLoading);
  const employeesApiMessage = useSelector((state) => state.employees.message);
  const employeesApiError = useSelector((state) => state.employees.error);
  const showModal = useSelector((state) => state.global.showModal);

  useEffect(() => dispatch(getEmployees()), []);

  useEffect(() => employeesApiError && dispatch(toggleModal(true)), [employeesApiError]);

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {isLoading || deletingEmployee ? (
        <Loading />
      ) : (
        <div className={styles.employeeList}>
          <table className={listStyles.table}>
            <thead>
              <tr className={listStyles.headerRow}>
                <th>Full Name</th>
                <th>Assigned Projects</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employeesList.map((employee) => {
                return (
                  <Link key={employee._id} to={`/admin/employees/${employee._id}`}>
                    <tr className={listStyles.rows}>
                      <td className={listStyles.td}>
                        {`${employee.firstName} ${employee.lastName}`}
                      </td>
                      <td className={listStyles.td}>{employee.assignedProjects.length}</td>
                      <td className={listStyles.td}>{employee.isActive ? 'Active' : 'Inactive'}</td>
                    </tr>
                  </Link>
                );
              })}
            </tbody>
          </table>
          <Modal handleClose={() => toggleModal(false)} isOpen={showModal}>
            <p className={styles.modalText}>{employeesApiMessage}</p>
          </Modal>
        </div>
      )}
    </section>
  );
};

export default EmployeesList;
