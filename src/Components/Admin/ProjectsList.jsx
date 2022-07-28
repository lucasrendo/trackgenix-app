import List from 'Components/Shared/List';
import Loading from 'Components/Shared/Loading';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetMessage } from 'redux/admins/actions';
import { deleteProject, getEmployees, getProjects } from 'redux/thunks/admin';
import { toggleModal } from 'redux/global/actions';
import Modal from 'Components/Shared/Modal';
import styles from './admin.module.css';

const ProjectsList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.admins.isLoading);
  const projectsList = useSelector((state) => state.projects.list);
  const deletingProject = useSelector((state) => state.projects.isLoading);
  const projectsApiMessage = useSelector((state) => state.projects.message);
  const employeesList = useSelector((state) => state.employees.list);
  const showModal = useSelector((state) => state.global.showModal);
  const [confirmation, setConfirmation] = useState(true);
  const [id, setId] = useState('');

  const headers = [
    { header: 'Project', key: 'projectName' },
    { header: 'Project Manager', key: 'projectManager' },
    { header: 'Start Date', key: 'startDate' },
    { header: 'End Date', key: 'endDate' },
    { header: 'Status', key: 'isActive' },
    { header: 'Client', key: 'client' }
  ];

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getEmployees());
  }, []);

  const confirmationHandler = () => {
    setConfirmation(false);
    dispatch(deleteProject(id));
  };

  const closeHandler = () => {
    dispatch(toggleModal(false));
    dispatch(resetMessage());
    setConfirmation(true);
  };

  const getProjectManager = (projectMembers) => {
    const found = projectMembers.find((employee) => employee.role === 'PM');
    return found && `${found.employeeId.firstName} ${found.employeeId.lastName}`;
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toDateString();
  };

  const listData = () => {
    return projectsList.map((project) => {
      return {
        id: project._id,
        projectName: project.projectName,
        projectManager: getProjectManager(project.employees) || '-',
        startDate: project.startDate && formatDate(project.startDate),
        endDate: project.endDate && formatDate(project.endDate),
        isActive: project.isActive ? 'Active' : 'Inactive',
        client: project.client
      };
    });
  };

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      {isLoading || deletingProject ? (
        <Loading />
      ) : (
        <>
          <List
            data={listData()}
            headers={headers}
            resource="/admin/projects"
            deleteItem={(id) => {
              setId(id);
              dispatch(toggleModal(true));
            }}
            showButtons={true}
          />
          <Modal
            handleClose={confirmation ? () => dispatch(toggleModal(false)) : () => closeHandler()}
            isOpen={showModal}
            isConfirmation={confirmation}
            confirmed={() => confirmationHandler()}
          >
            <p className={styles.modalText}>
              {confirmation ? 'Are you sure you want to delete this project?' : projectsApiMessage}
            </p>
          </Modal>
        </>
      )}
    </section>
  );
};

export default ProjectsList;
