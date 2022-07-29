import joi from 'joi';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { format, addDays } from 'date-fns/esm/fp';
import { getTasks, addTask, editTask, deleteTask } from 'redux/thunks/employee';
import { resetMessage } from 'redux/tasks/actions';
import List from 'Components/Shared/List';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';

const taskValidation = joi.object({
  employeeId: joi.string().required().label('Employee ID'),
  title: joi.string().max(30).required().label('Title'),
  description: joi.string().max(100).allow('').label('Description'),
  date: joi.date().allow('').label('Date'),
  done: joi.boolean().required().label('Done')
});

const ProjectTasks = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.project);
  const tasksList = useSelector((state) => state.tasks.list);
  const userId = useSelector((state) => state.auth.user._id);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const message = useSelector((state) => state.tasks.message);
  const isLoadingEmployees = useSelector((state) => state.employees.isLoading);
  const [taskId, setTaskId] = useState(null);
  const [membersList, setMembersList] = useState([]);
  const [projectTasksList, setProjectTasksList] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmation, setConfirmation] = useState(true);
  const headers = [
    { header: 'Title', key: 'title' },
    { header: 'Employee', key: 'employee' },
    { header: 'Done', key: 'done' }
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(taskValidation),
    defaultValues: {
      employeeId: '',
      title: '',
      description: '',
      date: '',
      done: false
    }
  });

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => setProjectTasksList(formatProjectTasksList()), [tasksList]);
  useEffect(() => project && setMembersList(formatMembersList()), [project]);

  const formatProjectTasksList = () => {
    const filteredList = tasksList?.filter((task) => task.projectId?._id === project._id);
    return filteredList.map((task) => {
      return {
        id: task._id,
        title: task.title,
        employee: task.employeeId ? task.employeeId.firstName + ' ' + task.employeeId.lastName : '',
        done: task.done ? 'Done' : 'Pending'
      };
    });
  };

  const formatMembersList = () => {
    return project?.employees.map((employee) => {
      if (employee.employeeId) {
        return {
          id: employee.employeeId._id,
          fullName:
            userId === employee.employeeId._id
              ? 'You'
              : `${employee.employeeId.firstName} ${employee.employeeId.lastName}`,
          role: employee.role,
          rate: employee.rate
        };
      }
    });
  };

  const delTask = (id) => {
    setProjectTasksList(projectTasksList.filter((task) => task.id !== id));
    dispatch(deleteTask(id));
  };

  const formatEmployees = () => {
    return membersList.map((employee) => {
      return { id: employee.id, text: `${employee.fullName}` };
    });
  };

  const closeHandlerForm = () => {
    reset({
      employeeId: '',
      title: '',
      description: '',
      date: '',
      done: false
    });
    setTaskId(null);
    setShowModalForm(false);
  };

  const confirmationHandler = () => {
    setConfirmation(false);
    delTask(taskId);
  };

  const closeHandlerModal = () => {
    dispatch(getTasks());
    dispatch(resetMessage());
    setShowModal(false);
    setConfirmation(true);
    setTaskId(null);
  };

  const openHandlerForm = (id) => {
    setConfirmation(false);
    let taskToEdit = {};
    tasksList?.map((task) => {
      if (id === task._id) {
        taskToEdit = {
          employeeId: task.employeeId._id,
          title: task.title,
          description: task.description,
          date: format('yyyy-MM-dd', addDays(1, new Date(task.date))),
          done: task.done
        };
        setTaskId(task._id);
      }
    });
    reset(taskToEdit);
    setShowModalForm(true);
  };

  const submitHandler = (data) => {
    setConfirmation(false);
    const reqData = {
      ...data,
      projectId: project._id
    };
    if (taskId) {
      dispatch(editTask(reqData, taskId));
    } else {
      dispatch(addTask(reqData));
    }
    reset({
      employeeId: '',
      title: '',
      description: '',
      date: '',
      done: false
    });
    setShowModalForm(false);
    setTaskId(null);
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.membersContainer}>
        <h4 className={styles.listTitle}>Tasks</h4>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <List
              data={projectTasksList}
              headers={headers}
              deleteItem={(id) => {
                setTaskId(id);
                setShowModal(true);
              }}
              editItem={(id) => openHandlerForm(id)}
              showButtons={true}
            />
            <Button onClick={() => setShowModalForm(true)}>Add task +</Button>
          </>
        )}
      </div>
      <Modal isOpen={showModalForm} isConfirmation={false} handleClose={() => closeHandlerForm()}>
        <h2 className={styles.modalText}>Task</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Select
            id={'employeeId'}
            text={'Employee'}
            options={!isLoadingEmployees ? formatEmployees() : []}
            register={register}
            error={errors.employeeId}
          />
          <Input
            id={'title'}
            text={'Title'}
            type={'text'}
            register={register}
            error={errors.title}
          />
          <Input
            id={'description'}
            text={'Description'}
            type={'text'}
            register={register}
            error={errors.description}
          />
          <Input type="date" id="date" text="Date" error={errors.date} register={register} />
          <Input type="checkbox" id="done" text="Done" error={errors.done} register={register} />
          <Button>Save</Button>
        </form>
      </Modal>
      <Modal
        isOpen={showModal}
        isConfirmation={confirmation}
        handleClose={confirmation ? () => setShowModal(false) : () => closeHandlerModal()}
        confirmed={() => confirmationHandler()}
      >
        <h2 className={styles.modalText}>
          {confirmation ? 'Are you sure you want to delete this task?' : message}
        </h2>
      </Modal>
    </>
  );
};

export default ProjectTasks;
