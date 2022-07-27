import joi from 'joi';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { format } from 'date-fns/esm/fp';
import {
  getTasks,
  addTask,
  editTask,
  deleteTask,
  getEmployees,
  getSingleProject
} from 'redux/thunks/employee';
import List from 'Components/Shared/List';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';

const taskValidation = joi.object({
  employeeId: joi.string().allow('').label('Employee ID'),
  title: joi.string().max(30).required().label('Title'),
  description: joi.string().max(100).allow('').label('Description'),
  date: joi.date().allow('').label('Date'),
  done: joi.boolean().required().label('Done')
});

const ProjectTasks = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.project);
  const tasksList = useSelector((state) => state.tasks.list);
  const employeeList = useSelector((state) => state.employees.list);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const isLoadingEmployees = useSelector((state) => state.employees.isLoading);
  const [projectTasksList, setProjectTasksList] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);
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

  useEffect(() => project && setProjectTasksList(formatProjectTasksList()), [project]);

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

  const formatEmployees = () => {
    return employeeList.map((employee) => {
      return { id: employee._id, text: `${employee.firstName} ${employee.lastName}` };
    });
  };

  const closeHandlerForm = () => {
    reset();
    setShowModalForm(false);
  };

  const submitHandler = (data) => {};

  return (
    <>
      <div className={styles.membersContainer}>
        <h4 className={styles.listTitle}>Tasks</h4>
        <List data={projectTasksList} headers={headers} showButtons={true} />
        <Button onClick={() => setShowModalForm(true)}>+</Button>
      </div>
      <Modal isOpen={showModalForm} isConfirmation={false} handleClose={() => closeHandlerForm()}>
        <h2 className={styles.modalText}>Add task</h2>
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
    </>
  );
};

export default ProjectTasks;
