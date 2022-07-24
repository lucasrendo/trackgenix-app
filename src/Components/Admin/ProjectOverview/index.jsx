import joi from 'joi';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { editProject, getSingleProject } from 'redux/thunks/admin';
import { toggleModal } from 'redux/global/actions';
import ProjectMembers from './ProjectMembers';
import ProjectDetails from './ProjectDetails';
import Loading from 'Components/Shared/Loading';
import Button from 'Components/Shared/Button';
import generalStyles from '../admin.module.css';
import styles from './ProjectOverview.module.css';

/*
! Project comes from server without employee names to show on members list
TODO - update server controller to handle this directly there or at least partially

TODO - Add responsive styles
*/

const ProjectOverview = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const project = useSelector((state) => state.projects.project);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const [editTitle, setEditTitle] = useState(false);
  const [error, setError] = useState('');
  const [projectName, setProjectName] = useState('');
  const titleSchema = joi
    .string()
    .min(3)
    .max(30)
    .pattern(/^[A-Za-z0-9 ]+$/)
    .required()
    .label('Project name');

  // Get project information
  useEffect(() => {
    dispatch(getSingleProject(projectId));
  }, []);

  // set initial name when project comes from server
  useEffect(() => setProjectName(project?.projectName), [project]);

  // Handle form opening and closing, title input validation and update
  const updateTitle = (name) => {
    if (name === projectName) return;

    const validation = titleSchema.validate(name);
    if (validation.error) {
      setError(validation.error.details[0].message);
      setProjectName(projectName);
    } else {
      dispatch(editProject({ projectName: name }, projectId));
      setProjectName(name);
      setEditTitle(false);
    }
  };

  // discard edit changes
  const abort = () => {
    setEditTitle(false);
    setError('');
  };

  return (
    <section className={generalStyles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {editTitle ? (
            <form>
              <input
                type="text"
                defaultValue={projectName}
                className={styles.titleInput}
                onFocus={() => setError('')}
                onBlur={(e) => updateTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && updateTitle(e.target.value)}
              />
              <Button classes="close" onClick={() => abort()}>
                X
              </Button>
              {error && <p className={styles.error}>{error}</p>}
            </form>
          ) : (
            <h2>
              {projectName} <span onClick={() => setEditTitle(true)}>&#9998;</span>
            </h2>
          )}
          <div className={styles.infoContainer}>
            <ProjectMembers />
            <ProjectDetails />
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectOverview;
