import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleTask, createTask, updateTask } from '../../../redux/Task/thunks';
import { getProjects } from '../../../redux/projects/thunks';
import { getEmployees } from '../../../redux/employees/thunks';
import { resetTask, resetMessage } from '../../../redux/Task/actions';
import Form from '../../Shared/Form/Form';
import Modal from '../../Shared/Modal/Modal';
import Loading from '../../Shared/Loading/Loading';
import styles from './tasks.module.css';

function Tasks() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employees.list);
  const projectList = useSelector((state) => state.projects.list);
  const task = useSelector((state) => state.tasks.task);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);
  const message = useSelector((state) => state.tasks.message);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const CONFIG = [
    {
      header: 'Employee',
      type: 'select',
      key: 'employeeId',
      options: employees,
      required: true
    },
    {
      header: 'Project',
      type: 'select',
      key: 'projectId',
      options: projects,
      required: true
    },
    {
      header: 'Title',
      type: 'text',
      key: 'title',
      required: true
    },
    {
      header: 'Description',
      type: 'text',
      key: 'description',
      required: true
    },
    {
      header: 'Date',
      type: 'date',
      key: 'date',
      required: true
    },
    {
      header: 'Done',
      type: 'checkbox',
      key: 'done',
      required: false
    }
  ];

  useEffect(() => {
    id && dispatch(getSingleTask(id));
    dispatch(getProjects());
    dispatch(getEmployees());
    dataOptions();
    return () => dispatch(resetTask());
  }, []);

  const dataOptions = () => {
    let projectsFormat = [];
    let employeesFormat = [];
    projectList.forEach((project) =>
      projectsFormat.push({ id: project._id, text: project.projectName })
    );
    employeeList.forEach((employee) => {
      employeesFormat.push({
        id: employee._id,
        text: `${employee.firstName} ${employee.lastName}`
      });
    });
    setEmployees(employeesFormat);
    setProjects(projectsFormat);
  };

  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = async (e) => {
    e.preventDefault();
    id ? dispatch(updateTask(inputValues, id)) : dispatch(createTask(inputValues));
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          data={CONFIG}
          itemData={task}
          submitHandler={submitHandler}
          userInput={[inputValues, setInputValues]}
        />
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default Tasks;
