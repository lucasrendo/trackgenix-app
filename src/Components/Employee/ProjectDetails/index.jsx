import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSingleProject } from 'redux/thunks/employee';
import { toggleModal } from 'redux/global/actions';
import Loading from 'Components/Shared/Loading';
import Button from 'Components/Shared/Button';
import styles from './index.module.css';

const ProjectOverview = () => {
  const dispatch = useDispatch();
  const projectId = useParams();
  const project = useSelector((state) => state.projects.project);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const [error, setError] = useState('');
  const [projectName, setProjectName] = useState('');

  // Get project information
  useEffect(() => {
    dispatch(getSingleProject(projectId.id));
  }, []);

  // set initial name when project comes from server
  useEffect(() => setProjectName(project?.projectName), [project]);

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
          {/* <div className={styles.infoContainer}>
            <ProjectMembers />
            <ProjectDetails />
          </div> */}
        </>
      )}
    </section>
  );
};

export default ProjectOverview;
