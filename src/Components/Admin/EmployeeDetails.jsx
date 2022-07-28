import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { toggleModal } from 'redux/global/actions';
import { editEmployees, getSingleEmployee } from 'redux/thunks/admin';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal';
import List from 'Components/Shared/List';
import styles from './admin.module.css';

const EmployeeDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: employeeId } = useParams();
  const employee = useSelector((state) => state.employees.employee);
  const employeeLoading = useSelector((state) => state.employees.isLoading);
  const employeeApiError = useSelector((state) => state.employees.error);
  const employeeApiMessage = useSelector((state) => state.employees.message);
  const showModal = useSelector((state) => state.global.showModal);
  const headers = [
    { header: 'Project', key: 'projectName' },
    { header: 'Role', key: 'role' },
    { header: 'Rate', key: 'rate' }
  ];

  useEffect(() => dispatch(getSingleEmployee(employeeId)), []);

  useEffect(() => employeeApiError && dispatch(toggleModal(true)), [employeeApiError]);

  const formatAssignedProjects = () => {
    return employee?.assignedProjects.map((project) => {
      const myEmployee = project.employees.find((member) => member.employeeId === employee._id);
      return {
        id: project._id,
        projectName: project.projectName,
        role: myEmployee?.role || '-',
        rate: myEmployee?.rate || '-'
      };
    });
  };

  const deleteHandler = (id) => {
    const filteredList = employee.assignedProjects.filter((project) => project._id !== id);
    dispatch(editEmployees({ assignedProjects: filteredList }, employeeId));
  };

  return (
    <section className={`${styles.container} ${styles.employeeDetailsContainer}`}>
      {employeeLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <h2>{`${employee?.firstName} ${employee?.lastName}`}</h2>
            <h3>
              User: {employee?.email} <span>({employee?.isActive ? 'active' : 'inactive'})</span>
            </h3>
          </div>
          <List
            data={formatAssignedProjects() || []}
            headers={headers}
            editItem={(id) => history.push({ pathname: `/admin/projects/${id}` })}
            deleteItem={(id) => deleteHandler(id)}
            showButtons={true}
          />
          <Modal isOpen={showModal} handleClose={() => dispatch(toggleModal(false))}>
            <p>{employeeApiMessage}</p>
          </Modal>
        </>
      )}
    </section>
  );
};

export default EmployeeDetails;
