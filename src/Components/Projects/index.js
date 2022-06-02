import { useState, useEffect } from 'react';
import styles from './projects.module.css';
import AddProject from './AddProject/addProjects';

function Projects() {
  const [projects, setProject] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProject(data.data);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }, []);
  const addProject = ({
    id,
    projectName,
    description,
    isActive,
    admin,
    client,
    startDate,
    endDate
  }) => {
    const newProject = {
      id,
      projectName,
      description,
      isActive,
      admin,
      client,
      startDate,
      endDate
    };
    setProject([...projects, newProject]);
  };
  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <AddProject addProject={addProject} />
    </section>
  );
}

export default Projects;
