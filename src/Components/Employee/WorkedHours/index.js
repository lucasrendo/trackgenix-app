import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import List from 'Components/Shared/List';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';
import { getSingleEmployee } from 'redux/employees/thunks';

const HoursForm = () => {
  const { id } = useParams();
  const [confirmation, setConfirmation] = useState(true);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employees.isLoading);
  const error = useSelector((state) => state.employees.error);
  const message = useSelector((state) => state.employees.message);
  const showModal = useSelector((state) => state.employees.showModal);

  const headers = [
    { header: 'Project Name', key: 'projectName' },
    { header: 'Monday', key: 'monday' },
    { header: 'Tuesday', key: 'tuesday' },
    { header: 'Wednesday', key: 'Wednesday' },
    { header: 'Thursday', key: 'Thursday' },
    { header: 'Friday', key: 'Friday' },
    { header: 'Saturday', key: 'Saturday' },
    { header: 'Sunday', key: 'Sunday' },
    { header: 'Total', key: 'Total' }
  ];

  useEffect(() => {
    dispatch(getSingleEmployee(id));
  });

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {isLoading ? (
        <Loading />
      ) : (
        {
          /* <List
          data={formatListData(list)}
          headers={headers}
          resource={resource}
        /> */
        }
      )}
      {/* <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal> */}
    </section>
  );
};
