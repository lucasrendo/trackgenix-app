import { useState, useEffect } from 'react';
import styles from './index.module.css';
import List from '../../Shared/List/List';
import Button from '../../Shared/Button/Button';
import Loading from '../../Shared/Loading/Loading';
import { Link } from 'react-router-dom';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const resource = '/projects';

  const deleteItem = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}${resource}${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    setProjects([...projects.filter((project) => project._id !== id)]);
  };

  const fetchProject = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}`);
      const jsonResponse = await response.json();
      setProjects(jsonResponse.data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(async () => {
    fetchProject();
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
      <div>
        <Link to={'/projects/form'} className={styles.LinkReset}>
          <Button classes="block">Create Timesheet</Button>
        </Link>
      </div>
    </section>
  );
}

export default Projects;
