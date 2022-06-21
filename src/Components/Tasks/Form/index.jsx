import joi from 'joi';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { getSingleTask, createTask, updateTask } from 'redux/Task/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { resetTask, resetMessage, setModal } from 'redux/Task/actions';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from 'Components/Tasks/Form/tasks.module.css';

function Tasks() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const task = useSelector((state) => state.tasks.task);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const fetchError = useSelector((state) => state.tasks.error);
  const message = useSelector((state) => state.tasks.message);
  const showModal = useSelector((state) => state.tasks.showModal);
  const employeeList = useSelector((state) => state.employees.list);
  const employeesLoading = useSelector((state) => state.employees.isLoading);
  const projectList = useSelector((state) => state.projects.list);
  const projectsLoading = useSelector((state) => state.projects.isLoading);

  const validationSchema = joi.object({
    employeeId: joi.string(),
    projectId: joi.string().required(),
    title: joi.string().max(30).required(),
    description: joi.string().max(100),
    date: joi.date(),
    done: joi.boolean().required()
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    reValidateMode: 'onBlur',
    resolver: joiResolver(validationSchema),
    defaultValues: {
      employeeId: '',
      projectId: '',
      title: '',
      description: '',
      date: '',
      done: false
    }
  });

  useEffect(() => {
    id && dispatch(getSingleTask(id));
    dispatch(getProjects());
    dispatch(getEmployees());
    return () => dispatch(resetTask());
  }, []);

  useEffect(() => formatProjects(), [projectList]);
  useEffect(() => formatEmployees(), [employeeList]);

  useEffect(() => {
    task &&
      reset({
        employeeId: task.employeeId?._id,
        projectId: task.projectId?._id,
        title: task.title,
        description: task.description,
        date: task.date.substring(0, 10),
        done: task.done
      });
  }, [task]);

  const formatProjects = () => {
    let formattedProjects = [];
    projectList.forEach((project) =>
      formattedProjects.push({ id: project._id, text: project.projectName })
    );
    return formattedProjects;
  };

  const formatEmployees = () => {
    let formattedEmployees = [];
    employeeList.forEach((employee) => {
      formattedEmployees.push({
        id: employee._id,
        text: `${employee.firstName} ${employee.lastName}`
      });
    });
    return formattedEmployees;
  };

  const closeHandler = () => {
    dispatch(setModal(false));
    dispatch(resetMessage());
    if (!fetchError) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = (data) => {
    id ? dispatch(updateTask(data, id)) : dispatch(createTask(data));
    dispatch(setModal(true));
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      {isLoading || projectsLoading || employeesLoading ? (
        <Loading />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <Select
            text="Employee"
            id="employeeId"
            options={formatEmployees()}
            error={errors.employeeId?.message}
            register={register}
          />
          <Select
            text="Project"
            id="projectId"
            options={formatProjects()}
            error={errors.projectId?.message}
            register={register}
          />
          <Input
            type="text"
            id="title"
            text="Title"
            error={errors.title?.message}
            register={register}
          />
          <Input
            type="text"
            id="description"
            text="Description"
            error={errors.description?.message}
            register={register}
          />
          <Input
            type="date"
            id="date"
            text="Date"
            error={errors.date?.message}
            register={register}
          />
          <Input
            type="checkbox"
            id="done"
            text="Done"
            error={errors.done?.message}
            register={register}
          />
          <div className={styles.btnsContainer}>
            <Button classes={'red'} onClick={() => goBack()}>
              Back
            </Button>
            <Button>Save</Button>
          </div>
        </form>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default Tasks;