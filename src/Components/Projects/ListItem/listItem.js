import React from 'react';
import styles from './listItem.module.css';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(listItem._id);
  };

  return (
    <tr>
      <td>{listItem.projectName}</td>
      <td>{listItem.startDate}</td>
      <td className={styles.center}>{listItem.isActive ? 'True' : 'False'}</td>
      <td>{listItem.client}</td>
      <td className={styles.center}>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListItem;
