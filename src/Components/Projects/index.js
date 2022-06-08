import { useState, useEffect } from 'react';
import styles from './projects.module.css';
import List from './List/list';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button/Button';
import Loading from '../Shared/Loading/Loading';

function Projects() {
  const [projectsList, setProjectsList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const resource = '/projects';

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

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonResponse = await response.json();
      setProjectsList(jsonResponse.data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const getEmployees = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      alert(error);
    }
  };

  const getAdmins = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      alert(error);
    }
  };

  const formatDataOptions = async () => {
    const rawEmployees = await getEmployees();
    const rawAdmins = await getAdmins();
    let adminsData = [];
    let employeesData = [];
    rawAdmins.forEach((admin, index) => {
      adminsData.push({ id: admin._id });
      adminsData[index].text = `${admin.firstName} ${admin.lastName}`;
      setAdmins(adminsData);
    });
    rawEmployees.forEach((employee, index) => {
      employeesData.push({ id: employee._id });
      employeesData[index].text = `${employee.firstName} ${employee.lastName}`;
      setEmployees(employeesData);
    });
  };

  useEffect(() => {
    formatDataOptions();
    getProjects();
  }, []);

  const data = [
    {
      header: 'Project Name',
      type: 'text',
      key: 'projectName',
      required: true
    },
    {
      header: 'Description',
      type: 'text',
      key: 'description',
      required: false
    },
    {
      header: 'Start Date',
      type: 'date',
      key: 'startDate',
      required: true
    },
    {
      header: 'End Date',
      type: 'date',
      key: 'endDate',
      required: false
    },
    {
      header: 'Admin',
      type: 'select',
      key: 'admin',
      options: admins,
      required: true
    },
    {
      header: 'Client',
      type: 'text',
      key: 'client',
      required: true
    },
    {
      header: 'Employees',
      type: 'select',
      key: 'employees',
      options: employees,
      required: true
    },
    {
      header: 'Role',
      type: 'text',
      key: 'role',
      required: true
    },
    {
      header: 'Rate',
      type: 'number',
      key: 'rate',
      required: true
    },
    {
      header: 'Is active',
      type: 'checkbox',
      key: 'isActive',
      required: false
    }
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>Projects</h2>
      <List list={projectsList} setList={setProjectsList} deleteItem={deleteItem} data={data} />
      <div>
        <Button>Project List</Button>
        <Link
          to={{
            pathname: '/projects/form',
            linkData: data,
            DBPath: resource
          }}
        >
          <Button>Save Project</Button>
        </Link>
      </div>
    </section>
  );
}

export default Projects;
