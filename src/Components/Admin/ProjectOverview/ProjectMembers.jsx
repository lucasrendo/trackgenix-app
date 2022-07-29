import joi from 'joi';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { editProject } from 'redux/thunks/admin';
import List from 'Components/Shared/List';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Select from 'Components/Shared/Select';
import Input from 'Components/Shared/Input';
import Loading from 'Components/Shared/Loading';
import generalStyles from '../admin.module.css';
import styles from './ProjectOverview.module.css';

const ProjectMembers = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const projectLoading = useSelector((state) => state.projects.isLoading);
  const project = useSelector((state) => state.projects.project);
  const message = useSelector((state) => state.projects.message);
  const employeesList = useSelector((state) => state.employees.list);
  const employeesLoading = useSelector((state) => state.employees.isLoading);
  const [membersList, setMembersList] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const headers = [
    { header: 'Member', key: 'fullName' },
    { header: 'Role', key: 'role' },
    { header: 'Rate', key: 'rate' }
  ];

  const employeeSchema = joi.object({
    employeeId: joi.string().required().label('Employee'),
    role: joi.string().valid('DEV', 'QA', 'PM', 'TL').insensitive().required().label('Role'),
    rate: joi.number().min(0).precision(2).required().label('Rate')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      employeeId: '',
      role: '',
      rate: 0
    },
    resolver: joiResolver(employeeSchema)
  });

  useEffect(() => project && setMembersList(formatMembersList()), [project]);

  // map members list for table from project's employees
  const formatMembersList = () => {
    return project?.employees.map((employee) => {
      if (employee.employeeId) {
        return {
          id: employee._id,
          employeeId: employee.employeeId._id,
          fullName: `${employee.employeeId.firstName} ${employee.employeeId.lastName}`,
          role: employee.role,
          rate: employee.rate
        };
      } else {
        deleteHandler(employee._id);
      }
    });
  };

  const formatEmployeesList = () => {
    return employeesList.map((employee) => {
      return {
        id: employee._id,
        text: `${employee.firstName} ${employee.lastName}`
      };
    });
  };

  // handle employee deletion from project
  const deleteHandler = (id) => {
    const filteredList = project.employees
      .filter((employee) => employee._id !== id)
      .map((employee) => {
        delete employee._id;
        return {
          ...employee,
          employeeId: employee.employeeId._id
        };
      });
    dispatch(editProject({ employees: filteredList }, projectId));
  };

  // Form modal Handlers
  const closeHandlerForm = () => {
    reset();
    setShowModalForm(false);
  };

  const editHandler = (id) => {
    setEditMode(true);
    const member = membersList.find((member) => member.id === id);
    setShowModalForm(true);
    reset({
      employeeId: member.employeeId,
      role: member.role,
      rate: member.rate
    });
  };

  const submitHandler = (data) => {
    setError(undefined);
    // Check for existing member
    if (!editMode) {
      const existingMember = membersList.find((member) => member.employeeId === data.employeeId);
      if (existingMember) return setError('This employee is already a project member');
    }
    // Check for existing PM
    const found = membersList.find((employee) => employee.role === 'PM');
    if (data.role === 'PM' && found) return setError('Project manager already assigned');
    // Change list of employees to database format
    const formattedList = project.employees.map((employee) => {
      delete employee._id;
      return {
        ...employee,
        employeeId: employee.employeeId._id
      };
    });
    // Update list of employees
    if (editMode) {
      const index = formattedList.findIndex((employee) => employee.employeeId === data.employeeId);
      formattedList.splice(index, 1, { ...formattedList[index], ...data });
      dispatch(editProject({ employees: formattedList }, projectId));
    } else {
      formattedList.push({ ...data, hoursInProject: 0 });
      dispatch(editProject({ employees: formattedList }, projectId));
    }
    setShowModalForm(false);
    setEditMode(false);
    setShowModal(true);
  };

  return (
    <div className={styles.membersContainer}>
      <h4 className={styles.listTitle}>Team members</h4>
      {projectLoading ? (
        <Loading />
      ) : (
        <>
          <List
            data={membersList}
            headers={headers}
            editItem={(id) => editHandler(id)}
            deleteItem={(id) => deleteHandler(id)}
            showButtons={true}
          />
          <Button classes="accept" onClick={() => setShowModalForm(true)}>
            +
          </Button>
        </>
      )}
      {
        <Modal isOpen={showModalForm} isConfirmation={false} handleClose={() => closeHandlerForm()}>
          <h2 className={styles.modalText}>Employee</h2>
          {employeesLoading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit(submitHandler)} onFocus={() => setError('')}>
              <Select
                id={'employeeId'}
                text={'Employee'}
                options={formatEmployeesList()}
                register={register}
                error={errors.employees}
              />
              <Input
                id={'role'}
                text={'Role'}
                type={'text'}
                register={register}
                error={errors.role}
              />
              <Input
                id={'rate'}
                text={'Rate'}
                type={'number'}
                register={register}
                error={errors.rate}
              />
              <Button>Save</Button>
              {error && <p className={generalStyles.error}>{error}</p>}
            </form>
          )}
        </Modal>
      }
      <Modal isOpen={showModal} isConfirmation={false} handleClose={() => setShowModal(false)}>
        <p className={styles.modalText}>{message}</p>
      </Modal>
    </div>
  );
};

export default ProjectMembers;
