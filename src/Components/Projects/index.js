import { useState, useEffect } from 'react';
import styles from './projects.module.css';
import Form from '../Shared/Form/Form';
import List from './List/list';

function Projects(props) {
  const [projectsList, setProjectsList] = useState([]);
  const [screen, changeScreen] = useState(false);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjectsList(data.data);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }, []);
  const addProject = ({
    _id,
    projectName,
    description,
    isActive,
    admin,
    client,
    startDate,
    endDate
  }) => {
    const newProject = {
      _id,
      projectName,
      description,
      isActive,
      admin,
      client,
      startDate,
      endDate
    };
    setProjectsList([...projectsList, newProject]);
  };

  const deleteItem = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      alert(`Project "${data.data.projectName}" was deleted successfully`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    setProjectsList([...projectsList.filter((project) => project._id !== _id)]);
  };

  const data = [
    {
      title: 'Project Name',
      type: 'text',
      id: 'projectName',
      required: true
    },
    {
      title: 'Description',
      type: 'text',
      id: 'description',
      required: false
    },
    {
      title: 'Start Date',
      type: 'date',
      id: 'startDate',
      required: true
    },
    {
      title: 'End Date',
      type: 'date',
      id: 'endDate',
      required: false
    },
    {
      title: 'Admin',
      type: 'text',
      id: 'client',
      required: true
    },
    {
      title: 'Client',
      type: 'text',
      id: 'client',
      required: true
    },
    {
      title: 'Is active',
      type: 'checkbox',
      id: 'isActive',
      required: false
    }
  ];

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      {screen ? (
        <Form data={data} props={props} addProject={addProject} />
      ) : (
        <List list={projectsList} setList={setProjectsList} deleteItem={deleteItem} data={data} />
      )}
      <div>
        <button onClick={() => changeScreen(false)}>Project List</button>
        <button onClick={() => changeScreen(true)}>Save Project</button>
      </div>
    </section>
  );
}

export default Projects;
