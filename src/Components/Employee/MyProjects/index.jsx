import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleEmployee } from 'redux/employees/thunks';
import List from 'Components/Shared/List';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal/Modal';
import styles from './index.module.css';

const EmployeeProjects = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employees.isLoading);
  const message = useSelector((state) => state.employees.message);
  const error = useSelector((state) => state.employees.error);
  const showModal = useSelector((state) => state.employees.showModal);
  const [confirmation, setConfirmation] = useState(true);
  const headers = [
    { header: 'First Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Mail', key: 'email' },
    { header: 'Active', key: 'isActive' }
  ];
  useEffect(() => {
    dispatch(getSingleEmployee(id));
  }, []);

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <>{/* <List data={formatListData(list)} headers={headers} /> */}</>
      )}
      {/* <Modal
        isOpen={showModal}
        isConfirmation={confirmation}
        handleClose={confirmation ? () => dispatch(setModal(false)) : () => closeHandler()}
        confirmed={() => confirmationHandler()}
      >
        <h2>{confirmation ? 'Are you sure you want to delete this employee' : message}</h2>
      </Modal> */}
    </section>
  );
};

export default EmployeeProjects;
