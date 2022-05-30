import React from 'react';
import Styles from './superAdmin.module.css';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(listItem._id);
  };

  return (
    <tr className={Styles.rows}>
      <td id="_id">{listItem._id}</td>
      <td id="name">{listItem.firstName}</td>
      <td id="last">{listItem.lastName}</td>
      <td id="email">{listItem.email}</td>
      <td id="status">{listItem.isActive.toString()}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListItem;
