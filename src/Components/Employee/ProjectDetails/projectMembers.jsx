import joi from 'joi';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { editProject, getEmployees, getSingleProject } from 'redux/thunks/employee';
import List from 'Components/Shared/List';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';

const employeeValidation = joi.object({
  employeeId: joi.string().required().label('Employee'),
  role: joi.string().valid('DEV', 'QA', 'PM', 'TL').insensitive().required().label('Role'),
  rate: joi.number().min(0).precision(2).required().label('Rate')
});

const ProjectMembers = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const project = useSelector((state) => state.projects.project);
  const userId = useSelector((state) => state.auth.user._id);
  const employeeList = useSelector((state) => state.employees.list);
  const isLoadingEmployees = useSelector((state) => state.employees.isLoading);
  const [membersList, setMembersList] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);
  const [employeeToEditId, setEmployeeToEditId] = useState(null);
  const headers = [
    { header: 'Member', key: 'fullName' },
    { header: 'Role', key: 'role' },
    { header: 'Rate', key: 'rate' }
  ];
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
    resolver: joiResolver(employeeValidation)
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => project && setMembersList(formatMembersList()), [project]);

  // map members list for table from project employees
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
      } else {
        deleteEmployee(employee._id);
      }
    });
  };

  // map members list for edit request
  const formatMembersReqList = () => {
    return project?.employees.map((employee) => {
      if (employee.employeeId) {
        return {
          employeeId: employee.employeeId._id,
          hoursInProject: employee.hoursInProject,
          role: employee.role,
          rate: employee.rate
        };
      }
    });
  };

  const formatEmployees = () => {
    return employeeList.map((employee) => {
      return { id: employee._id, text: `${employee.firstName} ${employee.lastName}` };
    });
  };

  // handle add employee in project
  const addEmployee = (employee) => {
    let newMembersList = formatMembersReqList();
    newMembersList.push(employee);
    dispatch(editProject({ employees: newMembersList }, project._id));
  };

  // handle add employee in project
  const editEmployee = (employee) => {
    let newMembersList = formatMembersReqList();
    newMembersList.map((emp, index) => {
      if (employee.employeeId === emp.employeeId) {
        newMembersList[index] = employee;
      }
    });
    dispatch(editProject({ employees: newMembersList }, project._id));
  };

  // handle employee deletion from project
  const deleteEmployee = (id) => {
    setMembersList(membersList.filter((employee) => employee.id !== id));
    let filteredList = project.employees
      .filter((employee) => employee.employeeId._id !== id)
      .map((employee) => {
        delete employee._id;
        return {
          ...employee,
          employeeId: employee.employeeId._id
        };
      });
    dispatch(editProject({ employees: filteredList }, project._id));
  };

  const closeHandlerForm = () => {
    reset({ employeeId: '', role: '', rate: 0 });
    setEmployeeToEditId(null);
    setShowModalForm(false);
  };

  const openHandlerForm = (id) => {
    let employeeToEdit = {};
    project?.employees.map((employee) => {
      if (id === employee.employeeId._id) {
        employeeToEdit = {
          employeeId: employee.employeeId._id,
          role: employee.role,
          rate: employee.rate
        };
      }
    });
    setEmployeeToEditId(employeeToEdit.employeeId);
    reset(employeeToEdit);
    setShowModalForm(true);
  };

  const submitHandler = (data) => {
    const reqData = {
      ...data,
      hoursInProject: 0
    };
    if (employeeToEditId) {
      editEmployee(reqData);
    } else {
      addEmployee(reqData);
    }
    reset();
    dispatch(getSingleProject(project._id));
    setShowModalForm(false);
    setEmployeeToEditId(null);
  };

  return (
    <>
      <div className={styles.membersContainer}>
        <h4 className={styles.listTitle}>Team members</h4>
        <List
          data={membersList}
          headers={headers}
          deleteItem={(id) => deleteEmployee(id)}
          editItem={(id) => openHandlerForm(id)}
          showButtons={true}
        />
        <Button onClick={() => setShowModalForm(true)}>+</Button>
      </div>
      <Modal isOpen={showModalForm} isConfirmation={false} handleClose={() => closeHandlerForm()}>
        <h2 className={styles.modalText}>Add employee</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Select
            id={'employeeId'}
            text={'Employee'}
            options={!isLoadingEmployees ? formatEmployees() : []}
            register={register}
            error={errors.employeeId}
          />
          <Select
            id={'role'}
            text={'Role'}
            options={[
              { text: 'PM', id: 'PM' },
              { text: 'TL', id: 'TL' },
              { text: 'DEV', id: 'DEV' },
              { text: 'QA', id: 'QA' }
            ]}
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
      </Modal>
    </>
  );
};

export default ProjectMembers;
