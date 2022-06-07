import { useState, useEffect } from 'react';
import styles from './projects.module.css';
import Form from '../Shared/Form/Form';
import List from '../Shared/List/List';
import Button from '../Shared/Button/Button';
import Loading from '../Shared/Loading/Loading';

function Projects() {
  const [projectsList, setProjectsList] = useState([]);
  const [method, setMethod] = useState('POST');
  const [screen, changeScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projectId, setProjectId] = useState('');
  const resource = 'projects';

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

  const deleteItem = (id) => {
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = response.json();
      alert(`Project ${data.data.projectName} was deleted successfully`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    setProjectsList([...projectsList.filter((project) => project._id !== id)]);
  };

  const editProject = (id) => {
    setMethod('PUT');
    changeScreen(true);
    setProjectId(id);
  };

  const fetchProject = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${resource}`);
      const jsonResponse = await response.json();
      setProjectsList(jsonResponse.data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
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
      {screen ? (
        <Form />
      ) : (
        <List
          data={formatListData(projectsList)}
          headers={headers}
          resource={resource}
          deleteItem={deleteItem}
          editItem={editProject}
          method={method}
        />
      )}
      <div>
        <Button onClick={() => changeScreen(false)}>Project List</Button>
        <Button onClick={() => changeScreen(true)}>Save Project</Button>
      </div>
    </section>
  );
}

export default Projects;
