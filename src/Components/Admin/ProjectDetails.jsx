import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { editProject, getSingleProject } from 'redux/thunks/admin';
import Joi from 'joi';
import List from 'Components/Shared/List';
import Input from 'Components/Shared/Input';
import Loading from 'Components/Shared/Loading';
import styles from './admin.module.css';
import Button from 'Components/Shared/Button';

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const project = useSelector((state) => state.projects.project);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    dispatch(getSingleProject(id));
  }, []);

  useEffect(() => {
    setProjectName(project?.projectName);
  }, [project?.projectName]);

  const updateTitle = (name) => {
    if (name === projectName) return;
    // Validate title
    const projectValidation = Joi.string()
      .min(3)
      .max(30)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .required()
      .label('Project name');

    const validation = projectValidation.validate(name);

    if (validation.error) {
      setError(validation.error.details[0].message);
      setProjectName(projectName);
    } else {
      dispatch(editProject({ projectName: name }, id));
      setProjectName(name);
      setEditMode(false);
    }
  };

  const abort = () => {
    setEditMode(false);
    setError('');
  };

  return (
    <section className={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {editMode ? (
            <form id="title-form">
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
              {projectName}{' '}
              <span style={{ cursor: 'pointer' }} onClick={() => setEditMode(true)}>
                &#9998;
              </span>
            </h2>
          )}
          {/* <List /> */}
        </>
      )}
    </section>
  );
};

export default ProjectDetails;
