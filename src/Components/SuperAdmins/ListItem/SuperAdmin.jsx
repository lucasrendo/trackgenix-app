import React from 'react';
import Styles from './superAdmin.module.css';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(listItem._id);
  };
  const url = `/super-admins/form?id=${listItem._id}`;
  return (
    <tr className={Styles.rows}>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>{listItem.isActive.toString()}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
      <td>
        <button>
          <a href={url}>Edit</a>
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
