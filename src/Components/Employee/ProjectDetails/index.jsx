import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSingleProject } from 'redux/thunks/employee';
import { toggleModal } from 'redux/global/actions';
import { format } from 'date-fns/esm/fp';
import Loading from 'Components/Shared/Loading';
import Button from 'Components/Shared/Button';
import styles from './index.module.css';
import ProjectMembers from './projectMembers';

const ProjectOverview = () => {
  const dispatch = useDispatch();
  const projectId = useParams();
  const project = useSelector((state) => state.projects.project);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const [error, setError] = useState('');
  const [projectName, setProjectName] = useState('');
  const [details, setDetails] = useState({
    client: '',
    startDate: '',
    endDate: '',
    isActive: false
  });

  // Get project information
  useEffect(() => {
    dispatch(getSingleProject(projectId.id));
  }, []);

  // set initial name when project comes from server
  useEffect(() => {
    if (project) {
      setProjectName(project?.projectName);
      setDetails({
        client: project.client,
        startDate: format('dd/MM/yyyy', new Date(project.startDate)),
        endDate: format('dd/MM/yyyy', new Date(project.endDate)),
        isActive: project.isActive
      });
    }
  }, [project]);

  // discard edit changes
  const abort = () => {
    setError('');
  };

  return (
    <section className={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h2 className={styles.title}>{projectName}</h2>
          <div>
            <h4 className={styles.listTitle}>Project Details</h4>
            <p className={styles.details}>Client: {details?.client}</p>
            <p className={styles.details}>Start Date: {details?.startDate}</p>
            <p className={styles.details}>End Date: {details?.endDate}</p>
            <p className={styles.details}>Status: {details?.isActive ? 'Active' : 'Inactive'}</p>
          </div>
          <div className={styles.infoContainer}>
            <ProjectMembers />
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectOverview;
