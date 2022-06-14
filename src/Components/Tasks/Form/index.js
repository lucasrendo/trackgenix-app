import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleTask, createTask, updateTask } from '../../../redux/Task/thunks';
import { fillTask, resetTask, resetMessage } from '../../../redux/Task/actions';
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
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => !showModal && dispatch(resetMessage()), [showModal]);

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
    let projectsData = [];
    let employeesData = [];
    rawEmployees.forEach((employee, index) => {
      employeesData.push({ id: employee._id });
      employeesData[index].text = `${employee.firstName} ${employee.lastName}`;
    });
    rawProjects.forEach((project, index) => {
      projectsData.push({ id: project._id });
      projectsData[index].text = `${project.projectName}`;
    });
    setEmployees(employeesData);
    setProjects(projectsData);
  };

  const closeHandler = () => {
    setShowModal(false);
    if (!error) goBack();
  };

  // === Handle submit data and method === //
  const submitHandler = (e) => {
    e.preventDefault();
    id ? dispatch(updateTask(task, id)) : dispatch(createTask(task));
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
          action={(input) => fillTask(input)}
        />
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default Tasks;
