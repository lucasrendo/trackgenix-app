import joi from 'joi';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { editProject } from 'redux/thunks/admin';
import List from 'Components/Shared/List';
import Input from 'Components/Shared/Input';
import styles from './ProjectOverview.module.css';

const ProjectMembers = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const project = useSelector((state) => state.projects.project);
  const [membersList, setMembersList] = useState([]);
  const headers = [
    { header: 'Member', key: 'fullName' },
    { header: 'Role', key: 'role' },
    { header: 'Rate', key: 'rate' }
  ];

  useEffect(() => project && setMembersList(formatMembersList()), [project?.employees]);

  // map members list for table from project employees
  const formatMembersList = () => {
    return project?.employees.map((employee) => {
      if (employee.employeeId) {
        return {
          id: employee._id,
          fullName: `${employee.employeeId.firstName} ${employee.employeeId.lastName}`,
          role: employee.role,
          rate: employee.rate
        };
      } else {
        deleteEmployee(employee._id);
      }
    });
  };

  // handle employee deletion from project
  const deleteEmployee = (id) => {
    setMembersList(membersList.filter((employee) => employee._id !== id));
    let filteredList = project.employees
      .filter((employee) => employee._id !== id)
      .map((employee) => {
        delete employee._id;
        return {
          ...employee,
          employeeId: employee.employeeId._id
        };
      });
    dispatch(editProject({ employees: filteredList }, projectId));
  };

  return (
    <div className={styles.membersContainer}>
      <h4 className={styles.listTitle}>Team members</h4>
      <List
        data={membersList}
        headers={headers}
        deleteItem={(id) => deleteEmployee(id)}
        showButtons={true}
      />
    </div>
  );
};

export default ProjectMembers;
