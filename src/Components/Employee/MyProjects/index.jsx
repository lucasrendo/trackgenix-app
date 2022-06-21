import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleEmployee, getEmployees } from 'redux/employees/thunks';
import List from 'Components/Shared/List';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal/Modal';
import styles from './index.module.css';

const EmployeeProjects = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.employee);
  // const [employee, setEmployee] = useState();
  // const list = useSelector((state) => state.employees.list);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const message = useSelector((state) => state.employees.message);
  const error = useSelector((state) => state.employees.error);
  const showModal = useSelector((state) => state.employees.showModal);
  const [projects, setProjects] = useState([]);
  const [confirmation, setConfirmation] = useState(true);
  const headers = [
    { header: 'Project Name', key: 'projectName' },
    { header: 'Client', key: 'client' },
    { header: 'Start Date', key: 'startDate' },
    { header: 'End Date', key: 'endDate' }
  ];

  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
    //dispatch(getEmployees());
  }, []);

  // const filterEmployee = (list) => {
  //   const data = list.filter((employees) => {
  //     return employees._id === id;
  //   });
  //   setEmployee(data[0]);
  //   console.log(employee.assignedProjects);
  //   return employee.assignedProjects;
  // };

  const getEmployeeProjects = () => {
    setProjects(employee.assignedProjects ? employee.assignedProjects : []);
    console.log(projects);
    return projects;
  };

  return (
    <section className={styles.container}>
      <h2>My Projects</h2>
      {isLoading ? <Loading /> : <List data={[]} headers={headers} showButtons={false} />}
    </section>
  );
};

export default EmployeeProjects;
