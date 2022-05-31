import React from 'react';

const TimeSheet = ({ listItem, deleteItem, setModal }) => {
  const handleDeleteItem = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    };
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/${listItem._id}`, options).then(
      (response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        setModal(true);
        return deleteItem(listItem._id);
      }
    );
  };

  return (
    <tr>
      <td>{listItem._id}</td>
      <td>{listItem.employee.firstName}</td>
      <td>{listItem.employee.lastName}</td>
      <td>{listItem.project._id}.</td>
      <td>{listItem.role}.</td>
      <td>{listItem.date}</td>
      <td>{listItem.rate}</td>
      <td>{listItem.workedHours}</td>
      <td>{listItem.description}</td>
      <td>{listItem.task._id}.</td>
      <td>
        <button>Edit</button>
      </td>
      <td>
        <button onClick={handleDeleteItem}>X</button>
      </td>
    </tr>
  );
};

export default TimeSheet;
