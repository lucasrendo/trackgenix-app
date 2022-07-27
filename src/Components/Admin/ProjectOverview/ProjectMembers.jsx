import joi from 'joi';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { editProject, getEmployees } from 'redux/thunks/admin';
import List from 'Components/Shared/List';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Select from 'Components/Shared/Select';
import Input from 'Components/Shared/Input';
import styles from './ProjectOverview.module.css';
import Loading from 'Components/Shared/Loading';

/*
! SUBMIT HANDLER NOT WORKING - No clues to why
*/

const ProjectMembers = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const project = useSelector((state) => state.projects.project);
  const message = useSelector((state) => state.projects.message);
  const employeesList = useSelector((state) => state.employees.list);
  const employeesLoading = useSelector((state) => state.employees.isLoading);
  const [membersList, setMembersList] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      role: 'DEV',
      rate: 0,
      hoursInProject: 0
    },
    resolver: joiResolver(employeeSchema)
  });

  useEffect(() => project && setMembersList(formatMembersList()), [project?.employees]);

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
        deleteEmployee(employee._id);
      }
    });
  };

  const formatEmployeesList = () => {
    const nonMembersList = employeesList.map((employee) => {
      const existingMember = membersList.find((member) => member.employeeId === employee._id);
      if (!existingMember)
        return {
          id: employee._id,
          text: `${employee.firstName} ${employee.lastName}`
        };
    });
    nonMembersList.forEach((employee, i) => {
      !employee && nonMembersList.splice(i, 1);
    });
    return nonMembersList;
  };

  // handle employee deletion from project
  const deleteEmployee = (id) => {
    setMembersList(membersList.filter((employee) => employee.id !== id));
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

  // Add Employee
  const addEmployee = () => {
    dispatch(getEmployees());
    !showModalForm && setShowModalForm(true);
  };

  // Form modal Handlers
  const closeHandlerForm = () => {
    reset();
    setShowModalForm(false);
  };

  const submitHandler = (newMember) => {
    console.log(errors);
    console.log(newMember);
    // setMembersList(membersList.push();
    // dispatch(editProject({ employees: membersList }, projectId));
    // setShowModalForm(false);
    // setShowModal(true);
  };

  const closeHandlerModal = () => {
    // dispatch(getEmployeeTimesheets(id));
    // dispatch(resetMessage());
    // dispatch(resetTimesheet());
    setShowModal(false);
  };

  return (
    <div className={styles.membersContainer}>
      <h4 className={styles.listTitle}>Team members</h4>
      <List
        data={membersList}
        headers={headers}
        deleteItem={(id) => deleteEmployee(id)}
        showButtons={true}
      />
      <Button classes="accept" onClick={() => addEmployee()}>
        +
      </Button>
      {
        <Modal isOpen={showModalForm} isConfirmation={false} handleClose={() => closeHandlerForm()}>
          <h2 className={styles.modalText}>Employee</h2>
          {employeesLoading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit(submitHandler)}>
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
            </form>
          )}
        </Modal>
      }
      <Modal isOpen={showModal} isConfirmation={false} handleClose={() => closeHandlerModal()}>
        <h2 className={styles.modalText}>{message}</h2>
      </Modal>
    </div>
  );
};

export default ProjectMembers;
