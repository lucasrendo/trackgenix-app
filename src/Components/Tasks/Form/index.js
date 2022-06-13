import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleTask, createTask, updateTask } from '../../../redux/Task/thunks';
import { resetTask } from '../../../redux/Task/actions';
import Form from '../../Shared/Form/Form';
import Modal from '../../Shared/Modal/Modal';
import Loading from '../../Shared/Loading/Loading';
import styles from './tasks.module.css';

function Tasks() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.task);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const message = useSelector((state) => state.error);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const config = [
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
  }, []);

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      alert(error);
      setIsAdding(true);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      alert(error);
      setIsAdding(true);
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
    setIsAdding(false);
    if (!error) goBack();
  };

  // === Handle submit data and method === //
  const submitHandler = (e) => {
    e.preventDefault();
    id ? dispatch(updateTask(task, id)) : dispatch(createTask(task));

    setIsAdding(true);
    if (error === false) dispatch(resetTask());
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          data={config}
          itemData={task}
          submitHandler={submitHandler}
          // userInput={[inputValues, setInputValues]}
        />
      )}
      <Modal handleClose={() => closeHandler()} isOpen={isAdding} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default Tasks;
