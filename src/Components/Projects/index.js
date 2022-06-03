import { useState, useEffect } from 'react';
import styles from './projects.module.css';
import AddProject from './AddProject/addProjects';
import List from './List/list';

function Projects() {
  const [projectsList, setProjectsList] = useState([]);
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

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <List list={projectsList} setList={setProjectsList} deleteItem={deleteItem} />
      <h2>Projects</h2>
      <AddProject addProject={addProject} />
    </section>
  );
}

export default Projects;
