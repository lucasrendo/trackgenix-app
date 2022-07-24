import joi from 'joi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import styles from './ProjectOverview.module.css';
import generalStyles from '../admin.module.css';
import { editProject } from 'redux/thunks/admin';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.project);
  const [details, setDetails] = useState({
    client: '',
    startDate: '',
    endDate: '',
    isActive: false
  });
  const [editDetails, setEditDetails] = useState(false);

  const detailsSchema = joi.object({
    client: joi
      .string()
      .min(1)
      .max(20)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .required()
      .label('Client'),
    startDate: joi.date().required().label('Start Date'),
    endDate: joi.date().min(joi.ref('startDate')).allow('').label('End Date'),
    isActive: joi.boolean().required().label('Status')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      client: details.client,
      startDate: details.startDate?.substring(0, 10),
      endDate: details.endDate?.substring(0, 10),
      isActive: details.isActive
    },
    resolver: joiResolver(detailsSchema)
  });

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    // As the time is always set at 00:00:00:000, JS understands that is still 1 ms away
    // from actually the day the string shows, so we add a day to fix that
    date.setDate(date.getDate() + 1);
    return date.toDateString();
  };

  useEffect(() => {
    if (project) {
      console.log(project.startDate);
      setDetails({
        client: project.client,
        startDate: project.startDate.substring(0, 10),
        endDate: project.endDate.substring(0, 10),
        isActive: project.isActive
      });
    }
  }, [project]);

  // discard edit changes
  const abort = () => {
    setEditDetails(false);
    reset(details);
  };

  const submitHandler = (data) => {
    if (data === details) setEditDetails(false);
    setDetails({
      ...data,
      startDate: data.startDate.toISOString().substring(0, 10),
      endDate: data.endDate.toISOString().substring(0, 10)
    });
    dispatch(editProject(data, projectId));
    setEditDetails(false);
  };

  return (
    <div>
      <h4 className={styles.listTitle}>
        Project Details{' '}
        {!editDetails && (
          <span
            onClick={() => {
              setEditDetails(true);
              reset(details);
            }}
          >
            &#9998;
          </span>
        )}
      </h4>
      {editDetails ? (
        <form className={styles.detailsForm} onSubmit={handleSubmit(submitHandler)}>
          <div>
            <div>
              <label htmlFor="client">Client: </label>
              <input
                type="text"
                {...register('client')}
                className={errors.client && styles.error}
              />
              {errors.client && <p className={generalStyles.error}>{errors.client.message}</p>}
            </div>
            <label htmlFor="startDate">Start Date: </label>
            <input
              type="date"
              {...register('startDate')}
              className={errors.startDate && styles.error}
            />
            {errors.startDate && <p className={generalStyles.error}>{errors.startDate.message}</p>}
          </div>
          <div>
            <label htmlFor="endDate">End Date: </label>
            <input
              type="date"
              {...register('endDate')}
              className={errors.endDate && styles.error}
            />
            {errors.endDate && <p className={generalStyles.error}>{errors.endDate.message}</p>}
          </div>
          <div>
            <label htmlFor="isActive">Status </label>
            <input
              type="checkbox"
              {...register('isActive')}
              className={errors.isActive && styles.error}
            />
            {errors.isActive && <p className={generalStyles.error}>{errors.isActive.message}</p>}
          </div>
          <Button classes="close" onClick={() => abort()}>
            X
          </Button>
          <Button classes="accept">&#10003;</Button>
        </form>
      ) : (
        <>
          <p className={styles.details}>
            <span>Client:</span> {details.client}
          </p>
          <p className={styles.details}>
            <span>Start Date:</span> {formatDate(details.startDate)}
          </p>
          <p className={styles.details}>
            <span>End Date:</span> {formatDate(details.endDate)}
          </p>
          <p className={styles.details}>
            <span>Status:</span> {details.isActive ? 'Active' : 'Inactive'}
          </p>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
