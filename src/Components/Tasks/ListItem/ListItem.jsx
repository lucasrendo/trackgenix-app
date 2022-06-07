import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './listItem.component.css';
import Button from '../../Shared/Button/Button';

const ListItem = ({ listItem, deleteItem, data }) => {
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

  //const handleEdit = (id) => {
  //  return editTask(id);
  //};

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
        <Button>
          <Link
            to={{
              pathname: `tasks/${listItem._id}`,
              state: {
                from: '/tasks'
              },
              linkData: data,
              itemData: listItem
            }}
          >
            Edit
          </Link>
        </Button>
      </td>
      <td>
        <Button onClick={() => handleDelete(listItem.id)}>X</Button>
      </td>
    </tr>
  );
};

export default ListItem;
