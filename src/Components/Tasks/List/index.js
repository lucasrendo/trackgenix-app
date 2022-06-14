import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, deleteTask } from '../../../redux/Task/thunks';
import { resetMessage, setModal } from '../../../redux/Task/actions';
import List from '../../Shared/List/List';
import Button from '../../Shared/Button/Button';
import Loading from '../../Shared/Loading/Loading';
import Modal from '../../Shared/Modal/Modal';
import styles from './tasks.module.css';

function Tasks() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.tasks.list);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const message = useSelector((state) => state.tasks.message);
  const error = useSelector((state) => state.tasks.error);
  const showModal = useSelector((state) => state.tasks.showModal);
  const HEADERS = [
    { header: 'Employee', key: 'employee' },
    { header: 'Project', key: 'project' },
    { header: 'Title', key: 'title' },
    { header: 'Description', key: 'description' },
    { header: 'Date', key: 'date' },
    { header: 'Done', key: 'done' }
  ];

  useEffect(() => dispatch(getTasks()), []);

  const formatTaskData = (responseData) => {
    const data = responseData.map((task) => {
      return {
        id: task._id,
        employee: task.employeeId ? task.employeeId.firstName + ' ' + task.employeeId.lastName : '',
        project: task.projectId ? task.projectId.projectName : '',
        title: task.title,
        description: task.description,
        date: task.date.slice(0, 10),
        done: task.done.toString()
      };
    });
    return data;
  };

  const closeHandler = () => {
    !error && dispatch(getTasks());
    dispatch(setModal(false));
    dispatch(resetMessage());
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <List
            data={formatTaskData(list)}
            headers={HEADERS}
            resource="/tasks"
            deleteItem={async (id) => dispatch(deleteTask(id))}
          />
          <div>
            <Link to="/tasks/form" className={styles.linkReset}>
              <Button classes="block">Create Task</Button>
            </Link>
          </div>
        </>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default Tasks;
