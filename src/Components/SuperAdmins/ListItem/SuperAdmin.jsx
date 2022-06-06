import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './superAdmin.module.css';

const ListItem = ({ listItem, deleteItem, data }) => {
  const handleDelete = () => {
    deleteItem(listItem._id);
  };

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
          <Link
            to={{
              pathname: `super-admin/${listItem._id}`,
              state: {
                from: '/super-admin'
              },
              linkData: data,
              itemData: listItem
            }}
          >
            {console.log(data)}
            Edit
          </Link>
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
