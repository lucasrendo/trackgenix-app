import styles from './projects.module.css';
import { useEffect, useState } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
      // eslint-disable-next-line no-console
      console.log(data);
      // eslint-disable-next-line no-console
      console.log(projects);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <div>
        {projects.map((project) => (
          <div key={project._id}>
            <p>{project.projectName}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
