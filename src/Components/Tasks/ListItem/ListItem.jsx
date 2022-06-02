import React from 'react';
import Styles from './listItem.component.css';

const ListItem = ({ listItem, deleteItem, editTask }) => {
  const handleDelete = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    };
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${listItem._id}`, options).then((response) => {
      if (response.status !== 200) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return deleteItem(listItem._id);
    });
  };

  const handleEdit = (id) => {
    return editTask(id);
  };

  return (
    <tr className={Styles.rows}>
      <td>{listItem._id}</td>
      <td>{listItem.employeeId && listItem.employeeId.firstName}</td>
      <td>{listItem.projectId && listItem.projectId.projectName}</td>
      <td>{listItem.title}</td>
      <td>{listItem.description}</td>
      <td>{listItem.date.substring(0, 10)}</td>
      <td>{listItem.done.toString()}</td>
      <td>
        <button onClick={() => handleEdit(listItem._id)}>Edit</button>
      </td>
      <td>
        <button onClick={() => handleDelete(listItem.id)}>X</button>
      </td>
    </tr>
  );
};

export default ListItem;
