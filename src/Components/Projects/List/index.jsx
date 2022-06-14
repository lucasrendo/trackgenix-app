import { useEffect, useState } from 'react';
import styles from './index.module.css';
import List from '../../Shared/List/List';
import Button from '../../Shared/Button/Button';
import Loading from '../../Shared/Loading/Loading';
import Modal from '../../Shared/Modal/Modal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, deleteProject, getSingleProject } from '../../../redux/projects/thunks';

function Projects() {
  const [isAdding, setIsAdding] = useState(false);
  const resource = '/projects';
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const project = useSelector((state) => state.projects.project);

  const deleteItem = (id) => {
    dispatch(getSingleProject(id));
    setIsAdding(true);
  };

  const sureToDelete = () => {
    dispatch(deleteProject(project._id));
    dispatch(getProjects());
    setIsAdding(false);
  };

  useEffect(async () => {
    dispatch(getProjects());
  }, []);

  const formatListData = (responseData) => {
    const data = responseData.map((project) => {
      return {
        id: project._id,
        projectName: project.projectName,
        description: project.description,
        startDate: project.startDate.slice(0, 10),
        admin: project.admin ? project.admin.firstName + ' ' + project.admin.lastName : '',
        client: project.client,
        employee: project.employeeId
          ? project.employeeId.firstName + ' ' + project.employeeId.lastName
          : '',
        isActive: project.isActive.toString()
      };
    });
    return data;
  };

  const headers = [
    { header: 'Project Name', key: 'projectName' },
    { header: 'Description', key: 'description' },
    { header: 'Start Date', key: 'startDate' },
    { header: 'Admin', key: 'admin' },
    { header: 'Client', key: 'client' },
    { header: 'Employees', key: 'employee' },
    { header: 'Is Active?', key: 'isActive' }
  ];

  const closeHandler = () => {
    setIsAdding(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>Projects</h2>
      <List
        fullList={projects}
        data={formatListData(projects)}
        headers={headers}
        resource={resource}
        deleteItem={deleteItem}
      />
      <Modal
        handleClose={() => closeHandler()}
        isOpen={isAdding}
        isConfirmation={true}
        confirmed={() => sureToDelete()}
      >
        <h2>Are you sure you want to delete this project?</h2>
      </Modal>
      <div>
        <Link to={'/projects/form'} className={styles.linkReset}>
          <Button classes="block">Create Project</Button>
        </Link>
      </div>
    </section>
  );
}

export default Projects;
