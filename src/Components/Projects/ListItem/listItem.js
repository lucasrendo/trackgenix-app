import React from 'react';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(listItem._id);
  };

  return (
    <tr>
      <td>{listItem.projectName}</td>
      <td>{listItem.startDate}</td>
      <td>{listItem.isActive}</td>
      <td>{listItem.client}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListItem;
