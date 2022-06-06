import React from 'react';
import { Link } from 'react-router-dom';
import styles from './listItem.module.css';

const ListItem = ({ listItem, deleteItem, data }) => {
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
      <td className={styles.center}>
        <button>
          <Link
            to={{
              pathname: `projects/${listItem._id}`,
              state: { from: '/projects}' },
              linkData: data,
              itemData: listItem
            }}
          >
            Edit
          </Link>
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
