import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleEmployee } from 'redux/thunks/employee';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';
import { format, addDays } from 'date-fns/esm/fp';
import { Link } from 'react-router-dom';

const EmployeeProjects = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user._id);
  const employee = useSelector((state) => state.employees.employee);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const headers = [
    { header: 'Project Name', key: 'projectName' },
    { header: 'Client', key: 'client' },
    { header: 'Role', key: 'role' },
    { header: 'Start Date', key: 'startDate' },
    { header: 'End Date', key: 'endDate' }
  ];

  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
  }, []);

  const formatListData = (responseData) => {
    const data = responseData.map((project) => {
      const role = getRole(project);
      return {
        id: project._id,
        role: role,
        startDate: format('dd/MM/yyyy', addDays(1, new Date(project.startDate))),
        endDate: format('dd/MM/yyyy', addDays(1, new Date(project.endDate))),
        projectName: project.projectName,
        client: project.client
      };
    });
    return data;
  };

  const getRole = (project) => {
    let role = '';
    for (let i = 0; i < project.employees.length; i++) {
      if (project.employees[i].employeeId === id) {
        role = project.employees[i].role;
      }
    }
    return role;
  };

  return (
    <section className={styles.container}>
      <h2>My Projects</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              {headers.map((header, index) => {
                return (
                  <th key={index} className={styles.th}>
                    {header.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {formatListData(employee?.assignedProjects || []).map((row) => {
              return (
                <tr key={row.id} className={styles.rows}>
                  {headers.map((header, index) => {
                    return (
                      <td key={index} className={styles.td}>
                        {row.role === 'PM' ? (
                          <Link className={styles.linkReset} to={`/employee/projects/${row.id}`}>
                            {row[header.key]}
                          </Link>
                        ) : (
                          <>{row[header.key]}</>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default EmployeeProjects;
