import { useState, useEffect } from 'react';
import styles from './tasks.module.css';
import Form from './Form/Form';
import List from '../Shared/List/List';
import Button from '../Shared/Button/Button';

function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const [screen, changeScreen] = useState(false);
  const [formMethod, setMethod] = useState('POST');
  const [updTaskId, setId] = useState('');
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const resourse = 'tasks';

  const getTask = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/${resourse}`);
      const body = await res.json();
      setTasksList(body.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getTask();
    dataOptions();
  }, []);

  const getProjects = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const body = await res.json();
      return body.data;
    } catch (error) {
      alert(error);
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

  const dataOptions = async () => {
    const rawProjects = await getProjects();
    const rawEmployees = await getEmployees();
    let projectsData = [];
    let employeesData = [];
    rawEmployees.forEach((employee, index) => {
      employeesData.push({ id: employee._id });
      employeesData[index].text = `${employee.firstName} ${employee.lastName}`;
    });
    rawProjects.forEach((project, index) => {
      projectsData.push({ id: project._id });
      projectsData[index].text = `${project.projectName}`;
    });
    setEmployees(employeesData);
    setProjects(projectsData);
  };

  const editTask = (id) => {
    setMethod('PUT');
    changeScreen(true);
    setId(id);
  };

  const deleteItem = async (id) => {
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = response.json;
      window.alert('Task successfully deleted');
    } catch (error) {
      console.error(error);
    }
    setTasksList([...tasksList.filter((task) => task._id !== id)]);
  };

  const backToList = () => {
    setMethod('GET');
    changeScreen(false);
    alert('Successfully updated!');
  };

  const data = [
    {
      title: 'Employee',
      type: 'select',
      id: 'employeeId',
      options: employees,
      required: true
    },
    {
      title: 'Project',
      type: 'select',
      id: 'projectId',
      options: projects,
      required: true
    },
    {
      title: 'Title',
      type: 'text',
      id: 'title',
      required: true
    },
    {
      title: 'Description',
      type: 'text',
      id: 'description',
      required: true
    },
    {
      title: 'Date',
      type: 'date',
      id: 'date',
      required: true
    },
    {
      title: 'Done',
      type: 'checkbox',
      id: 'done',
      required: false
    }
  ];

  const formatTaskData = (responseData) => {
    const data = responseData.map((task) => {
      return {
        id: task._id,
        employee: task.employeeId ? task.employeeId.firstName + ' ' + task.employeeId.lastName : '',
        project: task.projectId ? task.projectId.projectName : '',
        title: task.title,
        description: task.description,
        date: task.date.slice(0, 10),
        done: task.done.toString()
      };
    });
    return data;
  };

  const headers = [
    { header: 'Employee', key: 'employee' },
    { header: 'Project', key: 'project' },
    { header: 'Title', key: 'title' },
    { header: 'Description', key: 'description' },
    { header: 'Date', key: 'date' },
    { header: 'Done', key: 'done' }
  ];

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div>
        <Button
          onClick={() => {
            changeScreen(false);
            setMethod('GET');
          }}
          className={styles.btn}
        >
          List of Tasks
        </Button>
        <Button
          onClick={() => {
            changeScreen(true);
            setMethod('POST');
          }}
          className={styles.btn}
        >
          Create Task
        </Button>
      </div>
      {screen ? (
        <Form formMethod={formMethod} back={() => backToList()} id={updTaskId} />
      ) : (
        <List
          data={formatTaskData(tasksList)}
          headers={headers}
          resource={resourse}
          list={tasksList}
          setList={setTasksList}
          deleteItem={deleteItem}
          editTask={(id) => editTask(id)}
        />
      )}
    </section>
  );
}

export default Tasks;
