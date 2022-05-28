import React from 'react';

const TimeSheet = ({ listItem, deleteItem }) => {
  const handleDeleteItem = () => {
    deleteItem(listItem._id);
  };

  return (
    <tr>
      <td>{listItem._id}</td>
      <td>{listItem.date}</td>
      <td>{listItem.project.employees[0].employeeId}</td>
      <td>{listItem.employee.firstName}</td>
      <td>{listItem.project.employees[0].role}</td>
      <td>{listItem.project.employees[0].hoursInProject}</td>
      <td>{listItem.project.projectName}.</td>
      <td>{listItem.task.description}.</td>
      <td>
        <button onClick={() => handleDeleteItem(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default TimeSheet;
