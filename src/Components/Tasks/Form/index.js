import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleTask, createTask, updateTask } from '../../../redux/Task/thunks';
import { resetTask, resetMessage } from '../../../redux/Task/actions';
import Form from '../../Shared/Form/Form';
import Modal from '../../Shared/Modal/Modal';
import Loading from '../../Shared/Loading/Loading';
import styles from './tasks.module.css';

function Tasks() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.task);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);
  const message = useSelector((state) => state.tasks.message);
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
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
    dataOptions();
    return () => dispatch(resetTask());
  }, []);

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      alert(error);
      setShowModal(true);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      alert(error);
      setShowModal(true);
    }
  };

  const dataOptions = async () => {
    const rawProjects = await getProjects();
    const rawEmployees = await getEmployees();
    rawEmployees.map((employee, index) => {
      rawEmployees.splice(index, 1, {
        id: employee._id,
        text: `${employee.firstName} ${employee.lastName}`
      });
    });
    rawProjects.map((project, index) => {
      rawProjects.splice(index, 1, { id: project._id, text: project.projectName });
    });
    setEmployees(rawEmployees);
    setProjects(rawProjects);
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
